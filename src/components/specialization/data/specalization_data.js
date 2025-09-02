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
          chapter_name: "HTML - Introduction to Web Development",
          chapter_description: "Learn the fundamentals of HTML (HyperText Markup Language), the backbone of web pages. This chapter covers everything from basic tags to forms and semantic elements.",
          icon: "Globe",
          subtopics: [
            {
              topic_id: "S1-H1-T1",
              topic_name: "Introduction to HTML",
              show_compiler: true,
              isCompleted: false,
              theory: {
                heading: "What is HTML?",
                paragraph: "HTML (HyperText Markup Language) is the standard language for creating web pages. It defines the structure of a webpage using elements and tags.",
                bulletpoints: [
                  "HTML is not a programming language, it's a markup language.",
                  "It uses tags enclosed in angle brackets.",
                  "A basic HTML document includes <!DOCTYPE html>, <html>, <head>, and <body>."
                ],
                example_code: "<!DOCTYPE html>\n<html>\n<head>\n<title>My First Page</title>\n</head>\n<body>\n<h1>Hello World!</h1>\n</body>\n</html>",
                output: "A webpage displaying 'Hello World!' as a heading.",
                practise_problems: [
                  {
                    question: "Write a basic HTML page with a title 'My Website' and a heading 'Welcome!'",
                    expected_output: "A webpage with the title 'My Website' and an H1 heading 'Welcome!'"
                  }
                ]
              }
            },
            {
              topic_id: "S1-H1-T2",
              topic_name: "HTML Elements & Attributes",
              show_compiler: true,
              isCompleted: false,
              theory: {
                heading: "Elements & Attributes",
                paragraph: "HTML elements define the structure of the content, while attributes provide additional information about elements.",
                bulletpoints: [
                  "Elements usually have an opening and closing tag.",
                  "Attributes are written inside the opening tag.",
                  "Common attributes include id, class, style, and href."
                ],
                example_code: "<p id='para1' class='text'>This is a paragraph.</p>",
                output: "A paragraph with an id 'para1' and a class 'text'.",
                practise_problems: [
                  {
                    question: "Create a paragraph with the text 'Hello HTML' and give it a class name 'intro'.",
                    expected_output: "A paragraph with class 'intro' showing 'Hello HTML'."
                  }
                ]
              }
            },
            {
              topic_id: "S1-H1-T3",
              topic_name: "HTML Headings & Paragraphs",
              show_compiler: true,
              isCompleted: false,
              theory: {
                heading: "Headings & Paragraphs",
                paragraph: "Headings (<h1> to <h6>) define titles, while <p> defines paragraphs of text.",
                bulletpoints: [
                  "<h1> is the largest heading, <h6> is the smallest.",
                  "Paragraphs are created using <p> tag.",
                  "Headings improve SEO and readability."
                ],
                example_code: "<h1>Main Heading</h1>\n<p>This is a paragraph.</p>",
                output: "A webpage with a heading and a paragraph.",
                practise_problems: [
                  {
                    question: "Create a webpage with one <h2> heading 'About Me' and one paragraph describing yourself.",
                    expected_output: "A webpage with an <h2> heading and a paragraph."
                  }
                ]
              }
            },
            {
              topic_id: "S1-H1-T4",
              topic_name: "HTML Lists",
              show_compiler: true,
              isCompleted: false,
              theory: {
                heading: "Lists in HTML",
                paragraph: "Lists allow us to group related items together in ordered or unordered format.",
                bulletpoints: [
                  "Unordered lists use <ul> and <li>.",
                  "Ordered lists use <ol> and <li>.",
                  "Definition lists use <dl>, <dt>, and <dd>."
                ],
                example_code: "<ul>\n<li>Apple</li>\n<li>Banana</li>\n<li>Cherry</li>\n</ul>",
                output: "A bulleted list of Apple, Banana, and Cherry.",
                practise_problems: [
                  {
                    question: "Create an ordered list of your top 3 favorite movies.",
                    expected_output: "An ordered list with 3 movie names."
                  }
                ]
              }
            },
            {
              topic_id: "S1-H1-T5",
              topic_name: "HTML Links & Images",
              show_compiler: true,
              isCompleted: false,
              theory: {
                heading: "Links & Images",
                paragraph: "Links (<a>) connect pages, and images (<img>) display pictures on webpages.",
                bulletpoints: [
                  "Links use the href attribute.",
                  "Images use the src attribute.",
                  "Always add alt text to images for accessibility."
                ],
                example_code: "<a href='https://example.com'>Visit Example</a>\n<img src='image.jpg' alt='Sample Image'>",
                output: "A link to Example.com and an image displayed on the page.",
                practise_problems: [
                  {
                    question: "Create a link to 'https://google.com' with text 'Google' and display an image 'logo.png'.",
                    expected_output: "A link that opens Google and displays an image."
                  }
                ]
              }
            },
            {
              topic_id: "S1-H1-T6",
              topic_name: "HTML Tables",
              show_compiler: true,
              isCompleted: false,
              theory: {
                heading: "Tables in HTML",
                paragraph: "Tables display data in rows and columns using <table>, <tr>, <th>, and <td>.",
                bulletpoints: [
                  "<table> defines a table.",
                  "<tr> defines a row.",
                  "<th> defines a header cell, <td> defines a data cell."
                ],
                example_code: "<table border='1'>\n<tr><th>Name</th><th>Age</th></tr>\n<tr><td>John</td><td>25</td></tr>\n</table>",
                output: "A table with two columns: Name and Age.",
                practise_problems: [
                  {
                    question: "Create a table with 2 rows and 2 columns showing any data.",
                    expected_output: "A simple 2x2 table."
                  }
                ]
              }
            },
            {
              topic_id: "S1-H1-T7",
              topic_name: "HTML Forms",
              show_compiler: true,
              isCompleted: false,
              theory: {
                heading: "Forms in HTML",
                paragraph: "Forms collect user input with elements like text fields, checkboxes, radio buttons, and submit buttons.",
                bulletpoints: [
                  "Forms use <form> element.",
                  "<input>, <textarea>, and <button> are common form controls.",
                  "Form data can be sent to a server using action and method attributes."
                ],
                example_code: "<form>\n<input type='text' placeholder='Enter name'>\n<input type='submit'>\n</form>",
                output: "A text field with a submit button.",
                practise_problems: [
                  {
                    question: "Create a form with a text input for 'username' and a submit button.",
                    expected_output: "A form with one input and one submit button."
                  }
                ]
              }
            },
            {
              topic_id: "S1-H1-T8",
              topic_name: "HTML Semantic Elements",
              show_compiler: true,
              isCompleted: false,
              theory: {
                heading: "Semantic HTML",
                paragraph: "Semantic elements give meaning to the content, improving accessibility and SEO.",
                bulletpoints: [
                  "<header>, <footer>, <article>, <section>, <aside>, <nav> are semantic elements.",
                  "They describe the role of the content.",
                  "Helps search engines and screen readers understand webpages better."
                ],
                example_code: "<header><h1>My Website</h1></header>\n<section><p>Welcome to my site!</p></section>\n<footer><p>© 2025</p></footer>",
                output: "A webpage structured with header, section, and footer.",
                practise_problems: [
                  {
                    question: "Create a webpage with a <header>, <section>, and <footer>.",
                    expected_output: "A page with semantic elements dividing the structure."
                  }
                ]
              }
            }
          ]
        },
        {
          chapter_id: "S1-H2",
          chapter_name: "CSS (Cascading Style Sheets)",
          chapter_description: "CSS is used to style and design HTML elements, controlling layout, colors, fonts, spacing, and responsiveness of web pages.",
          icon: "Palette",
          subtopics: [
            {
              topic_id: "S1-H2-T1",
              topic_name: "Introduction to CSS",
              show_compiler: false,
              isCompleted: false,
              theory: {
                heading: "Introduction to CSS",
                paragraph: "CSS (Cascading Style Sheets) describes how HTML elements should be displayed. It controls colors, fonts, layouts, and more.",
                bulletpoints: [
                  "Separates content from presentation",
                  "Provides consistency across web pages",
                  "Supports responsive design"
                ],
                example_code: "h1 { color: blue; font-size: 20px; }",
                output: "Renders all h1 headings in blue with font size 20px.",
                practise_problems: [
                  {
                    question: "Write CSS to make all paragraphs red.",
                    expected_output: "All <p> text turns red."
                  }
                ]
              }
            },
            {
              topic_id: "S1-H2-T2",
              topic_name: "Types of CSS",
              show_compiler: false,
              isCompleted: false,
              theory: {
                heading: "Types of CSS",
                paragraph: "CSS can be applied in three different ways: Inline, Internal, and External.",
                bulletpoints: [
                  "Inline CSS: Applied directly in the HTML element using style attribute",
                  "Internal CSS: Written inside <style> tag in the HTML file",
                  "External CSS: Written in a separate .css file and linked using <link>"
                ],
                example_code: "<style> p { color: green; } </style>",
                output: "All <p> text becomes green.",
                practise_problems: [
                  {
                    question: "Write inline CSS to make a heading blue.",
                    expected_output: "<h1 style='color: blue;'>Heading</h1>"
                  }
                ]
              }
            },
            {
              topic_id: "S1-H2-T3",
              topic_name: "Selectors",
              show_compiler: false,
              isCompleted: false,
              theory: {
                heading: "CSS Selectors",
                paragraph: "Selectors define which HTML elements will be styled.",
                bulletpoints: [
                  "Element Selector: h1 { }",
                  "Class Selector: .classname { }",
                  "ID Selector: #idname { }",
                  "Universal Selector: * { }",
                  "Group Selector: h1, p { }"
                ],
                example_code: "p.intro { color: purple; }",
                output: "Only <p> with class 'intro' becomes purple.",
                practise_problems: [
                  {
                    question: "Write a CSS rule to style an element with ID 'main' to have red text.",
                    expected_output: "#main { color: red; }"
                  }
                ]
              }
            },
            {
              topic_id: "S1-H2-T4",
              topic_name: "Colors and Backgrounds",
              show_compiler: false,
              isCompleted: false,
              theory: {
                heading: "Colors and Backgrounds",
                paragraph: "CSS provides properties to define text colors, background colors, and images.",
                bulletpoints: [
                  "color: Sets the text color",
                  "background-color: Sets the background color",
                  "background-image: Sets a background image",
                  "background-repeat, background-size: Control image behavior"
                ],
                example_code: "body { background-color: lightgray; }",
                output: "Webpage background becomes light gray.",
                practise_problems: [
                  {
                    question: "Write CSS to set a background image for the body.",
                    expected_output: "body { background-image: url('image.jpg'); }"
                  }
                ]
              }
            },
            {
              topic_id: "S1-H2-T5",
              topic_name: "Box Model",
              show_compiler: false,
              isCompleted: false,
              theory: {
                heading: "CSS Box Model",
                paragraph: "The box model describes the design and layout of each element.",
                bulletpoints: [
                  "Content: The actual text or image",
                  "Padding: Space between content and border",
                  "Border: Surrounds padding and content",
                  "Margin: Space outside the border"
                ],
                example_code: "div { margin: 20px; padding: 10px; border: 2px solid black; }",
                output: "A div with margin, padding, and border applied.",
                practise_problems: [
                  {
                    question: "Add padding of 15px to all paragraphs.",
                    expected_output: "p { padding: 15px; }"
                  }
                ]
              }
            },
            {
              topic_id: "S1-H2-T6",
              topic_name: "Flexbox & Grid",
              show_compiler: false,
              isCompleted: false,
              theory: {
                heading: "Flexbox & CSS Grid",
                paragraph: "Modern CSS provides layout systems like Flexbox and Grid for responsive design.",
                bulletpoints: [
                  "Flexbox: One-dimensional layout (row or column)",
                  "Grid: Two-dimensional layout (rows & columns)",
                  "Both help in building complex responsive layouts easily"
                ],
                example_code: "div.container { display: flex; gap: 10px; }",
                output: "Child elements arranged in a row with spacing.",
                practise_problems: [
                  {
                    question: "Write CSS to create a 2-column grid layout.",
                    expected_output: "display: grid; grid-template-columns: 1fr 1fr;"
                  }
                ]
              }
            },
            {
              topic_id: "S1-H2-T7",
              topic_name: "Responsive Design",
              show_compiler: false,
              isCompleted: false,
              theory: {
                heading: "Responsive Design",
                paragraph: "Responsive design ensures web pages look good on all devices.",
                bulletpoints: [
                  "Use media queries for different screen sizes",
                  "Use relative units like %, em, rem",
                  "Flexbox and Grid help achieve responsiveness"
                ],
                example_code: "@media (max-width: 600px) { body { background: lightblue; } }",
                output: "Background turns light blue on small screens.",
                practise_problems: [
                  {
                    question: "Write a media query to make font size 14px for screens smaller than 500px.",
                    expected_output: "@media (max-width: 500px) { body { font-size: 14px; } }"
                  }
                ]
              }
            }
          ]
        },
      ],
    },
  ],
}

export default specalization_data
