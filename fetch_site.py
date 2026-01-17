import requests
from bs4 import BeautifulSoup
import os
import urllib.parse

url = "https://tp21undiksha.my.id/simatika.30725/menu.html"
base_url = "https://tp21undiksha.my.id/simatika.30725/"

response = requests.get(url)
response.encoding = 'utf-8'

if response.status_code == 200:
    html_content = response.text
    with open("target_page.html", "w", encoding="utf-8") as f:
        f.write(html_content)
    print("HTML saved to target_page.html")
    
    soup = BeautifulSoup(html_content, 'html.parser')
    
    # Find CSS
    print("\nCSS Files:")
    for link in soup.find_all('link', rel='stylesheet'):
        href = link.get('href')
        print(href)
        
    # Find JS
    print("\nJS Files:")
    for script in soup.find_all('script'):
        src = script.get('src')
        if src:
            print(src)
            
    # Find Images
    print("\nImages:")
    for img in soup.find_all('img'):
        src = img.get('src')
        print(src)
        
else:
    print(f"Failed to retrieve page. Status code: {response.status_code}")
