// This matches the shape used in DocumentationSpecialization/HTML/CSS components.
const specalization_data = {
  modules: [
    {
      module_id: "S1",
      module_name: "HTML",
      description: "Foundations of the web: semantic markup, forms, media, and accessibility.",
      chapters: [
        {
          chapter_id: "S1-H1",
          chapter_name: "Getting Started with HTML",
          subtopics: [
            {
              topic_id: "S1-T1",
              topic_name: "HTML Basics",
              show_compiler: false,
              theory: {
                heading: "What is HTML?",
                paragraph:
                  "HTML defines the structure of web content using elements and tags. Learn how to create a basic HTML document.",
                bulletpoints: [
                  "HTML stands for HyperText Markup Language",
                  "Elements like <html>, <head>, <body> define structure",
                  "Headings: <h1> to <h6>, paragraphs: <p>",
                ],
                example_code:
                  "<!DOCTYPE html>\n<html>\n  <body>\n    <h1>Hello</h1>\n    <p>Welcome!</p>\n  </body>\n</html>",
                output: "Hello\nWelcome!",
              },
              practise_problems: [
                {
                  question: "Create an h1 with text 'Hello' and a paragraph 'Welcome!'",
                  expected_output: "Hello\nWelcome!",
                },
              ],
            },
          ],
        },
        {
          chapter_id: "S1-H2",
          chapter_name: "Links and Images",
          subtopics: [
            {
              topic_id: "S1-T1",
              topic_name: "Anchors and Images",
              show_compiler: true,
              theory: {
                heading: "Anchors and Images",
                paragraph:
                  "Use <a> to create links and <img> to display images. Remember to add alt text for accessibility.",
                bulletpoints: ["Anchor: <a href='...'>text</a>", "Image: <img src='...' alt='...'>"],
                example_code: "<a href='https://example.com'>Visit</a>\n<img src='/decorative.png' alt='Decorative' />",
                output: "Visit\n[Image]",
              },
              practise_problems: [
                {
                  question: "Create a link to https://example.com and an image with alt text 'Logo'.",
                  expected_output: "Link present\nImage alt: Logo",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      module_id: "S2",
      module_name: "CSS",
      description: "Core CSS for styling and layouts.",
      chapters: [
        {
          chapter_id: "S2-C1",
          chapter_name: "CSS Selectors",
          subtopics: [
            {
              topic_id: "S2-T1",
              topic_name: "Basic Selectors",
              show_compiler: true,
              theory: {
                heading: "Using Selectors",
                paragraph: "Selectors target elements to apply styles. Start with element, class, and id selectors.",
                bulletpoints: [
                  "Element selector: h1 { color: red; }",
                  "Class selector: .title { font-weight: 700; }",
                  "ID selector: #main { max-width: 800px; }",
                ],
                example_code:
                  "<style>\n  h1 { color: red; }\n  .title { font-weight: 700; }\n  #main { max-width: 800px; }\n</style>\n<div id='main'>\n  <h1 class='title'>Hello</h1>\n</div>",
                output: "Styles applied",
              },
              practise_problems: [
                {
                  question: "Style all h1 as blue and make .title bold.",
                  expected_output: "h1 blue\n.title bold",
                },
              ],
            },
          ],
        },
        {
          chapter_id: "S2-C2",
          chapter_name: "Flexbox Basics",
          subtopics: [
            {
              topic_id: "S2-T1",
              topic_name: "Flex Containers",
              show_compiler: false,
              theory: {
                heading: "Flex Layout",
                paragraph: "Flexbox simplifies 1D layouts. Use display:flex on a parent to align children.",
                bulletpoints: ["display: flex", "justify-content and align-items"],
                example_code:
                  "<style>\n.container { display:flex; gap:8px; }\n.box { width:40px; height:40px; background:#ddd; }\n</style>\n<div class='container'>\n  <div class='box'></div><div class='box'></div><div class='box'></div>\n</div>",
                output: "Three boxes in a row",
              },
              practise_problems: [
                {
                  question: "Center items in a flex container both vertically and horizontally.",
                  expected_output: "justify-content:center; align-items:center;",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

export default specalization_data
