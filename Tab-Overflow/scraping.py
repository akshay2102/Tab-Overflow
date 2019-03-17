from bs4 import BeautifulSoup
from bs4.element import Comment
import urllib.request

def tag_visible(element):
    if element.parent.name in ['style', 'script', 'head', 'meta', '[document]']:
        return False
    if isinstance(element, Comment):
        return False
    return True


def text_from_html(body):
    soup = BeautifulSoup(body, 'html.parser')
    texts = soup.findAll(text=True)
    visible_texts = filter(tag_visible, texts)  
    return u" ".join(t.strip() for t in visible_texts)

html = urllib.request.urlopen('https://en.wikipedia.org/wiki/Voice_over_LTE').read()
# print(text_from_html(html))
output_file = open('v.txt','w')
output_file.write(str(text_from_html(html)))
print("done")
output_file.close()









# import urllib
# import urllib.request
# from bs4 import BeautifulSoup
# from w3lib.html import remove_tags, remove_tags_with_content

# #define URL for scraping
# theurl = "http://aimaterials.blogspot.com/p/blog-page_18.html"
# thepage = urllib.request.urlopen(theurl)

# #Cooking the Soup
# soup = BeautifulSoup(thepage,"html.parser")
# # page = urllib2.urlopen('https://stackoverflow.com/questions/1936466/beautifulsoup-grab-visible-webpage-text').read()
# # soup = BeautifulSoup(page)
# # body = soup.find('body')
# body = soup.get_text()
# output = remove_tags(remove_tags_with_content(body, ('script', )))
# # the_contents_of_body_without_body_tags = body.findChildren()
# # print(str(the_contents_of_body_without_body_tags))
# output_file = open('v.txt','w')
# output_file.write(str(output).replace('\n',''))
# print("done")
# output_file.close()