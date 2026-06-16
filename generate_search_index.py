import os
import re
import json
from html.parser import HTMLParser

class SummaryParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.title = ""
        self.h1 = ""
        self.in_title = False
        self.in_h1 = False
        
        # Section tracking
        self.sections = [] # list of dicts: {id, title, text_content}
        self.current_section = None
        self.in_section = False
        self.section_depth = 0
        
        # Element content capture
        self.current_h2 = ""
        self.in_h2 = False
        
        # Sub-concepts capture
        self.in_hx = False
        self.current_hx = ""
        self.current_hx_id = None
        
    def handle_starttag(self, tag, attrs):
        attrs_dict = dict(attrs)
        
        if tag == 'title':
            self.in_title = True
        elif tag == 'h1' and not self.h1:
            self.in_h1 = True
            
        elif tag == 'section':
            sec_id = attrs_dict.get('id')
            if sec_id:
                self.in_section = True
                self.section_depth = 1
                self.current_section = {
                    "id": sec_id,
                    "title": "",
                    "text_parts": []
                }
            elif self.in_section:
                # Nested section, increment depth
                self.section_depth += 1
                
        elif tag == 'h2' and self.in_section:
            self.in_h2 = True
            self.current_h2 = ""
        elif tag in ['h3', 'h4'] and self.in_section:
            hx_id = attrs_dict.get('id')
            if hx_id:
                self.in_hx = True
                self.current_hx = ""
                self.current_hx_id = hx_id

    def handle_endtag(self, tag):
        if tag == 'title':
            self.in_title = False
        elif tag == 'h1':
            self.in_h1 = False
            
        elif tag == 'section':
            if self.in_section:
                self.section_depth -= 1
                if self.section_depth == 0:
                    self.in_section = False
                    # Finalize current section
                    if self.current_section:
                        text_content = " ".join(self.current_section["text_parts"])
                        # Clean whitespace
                        text_content = re.sub(r'\s+', ' ', text_content).strip()
                        self.current_section["content"] = text_content
                        del self.current_section["text_parts"]
                        
                        # Fallback title if no h2 was found
                        if not self.current_section["title"]:
                            self.current_section["title"] = self.current_section["id"].capitalize()
                            
                        self.sections.append(self.current_section)
                        self.current_section = None
                        
        elif tag == 'h2':
            if self.in_h2:
                self.in_h2 = False
                if self.current_section:
                    # Clean title text
                    title_text = re.sub(r'\s+', ' ', self.current_h2).strip()
                    self.current_section["title"] = title_text
        elif tag in ['h3', 'h4']:
            if self.in_hx:
                self.in_hx = False
                if self.current_section and self.current_hx_id:
                    title_text = re.sub(r'\s+', ' ', self.current_hx).strip()
                    if "sub_concepts" not in self.current_section:
                        self.current_section["sub_concepts"] = []
                    self.current_section["sub_concepts"].append({
                        "id": self.current_hx_id,
                        "title": title_text
                    })
                self.current_hx_id = None

    def handle_data(self, data):
        if self.in_title:
            self.title += data
        elif self.in_h1:
            self.h1 += data
        elif self.in_h2:
            self.current_h2 += data
        elif self.in_hx:
            self.current_hx += data
        
        if self.in_section and self.current_section:
            # We don't append to text_parts if it's inside h2 to avoid duplicate title in search content
            if not self.in_h2:
                self.current_section["text_parts"].append(data)

def extract_summary_data(filepath):
    print(f"Parsing {filepath}...")
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            html_content = f.read()
    except Exception as e:
        print(f"Error reading {filepath}: {e}")
        return None

    parser = SummaryParser()
    parser.feed(html_content)
    
    # Clean up page title
    page_title = parser.h1.strip() if parser.h1 else parser.title.strip()
    page_title = re.sub(r'\s+', ' ', page_title)
    # Remove things like "– Aula 01 | Premium Learning"
    page_title = re.split(r'\s+[-–|]\s+', page_title)[0]
    
    # Determine subject from directory name
    parts = filepath.replace('\\', '/').split('/')
    subject_dir = parts[-2]
    
    # Subject friendly names mapping
    subject_names = {
        "constitucional": "Constitucional II",
        "civil-ii": "Direito Civil II",
        "direito-digital": "Direito Digital",
        "direitos-humanos": "Direitos Humanos",
        "penal-ii": "Direito Penal II"
    }
    subject_name = subject_names.get(subject_dir, subject_dir.replace('-', ' ').capitalize())
    
    relative_url = f"subjects/{subject_dir}/{parts[-1]}"
    
    # If the file has no sections, or it's an index.html of penal-ii (which is just a portal)
    if not parser.sections or (subject_dir == "penal-ii" and parts[-1] == "index.html"):
        print(f"Skipping {filepath} (no study pill sections found or is index)")
        return None
        
    return {
        "subject": subject_name,
        "summaryTitle": page_title,
        "url": relative_url,
        "sections": parser.sections
    }

def main():
    subjects_dir = "subjects"
    all_pills = []
    
    for root, dirs, files in os.walk(subjects_dir):
        for file in files:
            if file.endswith(".html"):
                filepath = os.path.join(root, file)
                res = extract_summary_data(filepath)
                if res:
                    for sec in res["sections"]:
                        # Excerpt: first 160 chars
                        excerpt = sec["content"][:160] + "..." if len(sec["content"]) > 160 else sec["content"]
                        
                        # Generate some simple tags from text
                        words = re.findall(r'\w{4,}', sec["content"].lower())
                        stop_words = {"para", "como", "uma", "mais", "com", "por", "dos", "das", "sua", "seu", "pelo", "pela", "este", "esta", "isso"}
                        tags_set = {w for w in words if w not in stop_words}
                        tags = " ".join(list(tags_set)[:12])
                        
                        all_pills.append({
                            "id": sec["id"],
                            "subject": res["subject"],
                            "summaryTitle": res["summaryTitle"],
                            "url": res["url"],
                            "title": sec["title"],
                            "excerpt": excerpt,
                            "content": sec["content"],
                            "tags": tags
                        })
                        
                        for sub in sec.get("sub_concepts", []):
                            all_pills.append({
                                "id": sub["id"],
                                "subject": res["subject"],
                                "summaryTitle": f"{res['summaryTitle']} - {sec['title']}",
                                "url": res["url"], # hash will be added by portal-core or index.html dynamically if we want, but index.html uses id
                                "title": sub["title"],
                                "excerpt": excerpt,
                                "content": sec["content"],
                                "tags": tags + " " + sub["title"].lower()
                            })
                        
    # Build search-index.js
    output_js = os.path.join(".", "search-index.js")
    
    # Format as JSON string with indentation
    json_data = json.dumps(all_pills, ensure_ascii=False, indent=2)
    
    js_content = f"// Generated automatically. Do not edit manually.\nwindow.SEARCH_INDEX = {json_data};\n"
    
    with open(output_js, 'w', encoding='utf-8') as f:
        f.write(js_content)
        
    print(f"\nGenerated {output_js} with {len(all_pills)} search pills.")

if __name__ == "__main__":
    main()
