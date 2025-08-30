export const cModule = {
  module: {
    module_id: "M1",
    chapters: [
      // C1 from user-provided schema (now with paragraph)
      {
        chapter_id: "C1",
        chapter_name: "Introduction to C Programming",
        chapter_description:
          "This chapter introduces the C programming language, its history, features, and the basic structure of a C program.",
        icon: "BookOpen",
        subtopics: [
          {
            topic_id: "T1",
            topic_name: "History of C",
            show_compiler: false,
            isCompleted: false,
            theory: {
              heading: "History of C Language",
              paragraph:
                "The C language was created to provide a powerful yet flexible language for system programming. It quickly gained popularity due to its efficiency, portability, and ability to work close to hardware, making it widely used in operating systems and embedded systems.",
              bulletpoints: [
                "C was developed in 1972 by Dennis Ritchie at Bell Labs.",
                "It was created as a successor to the B language.",
                "C became widely popular for system programming and operating systems.",
                "UNIX operating system was written in C.",
              ],
              example_code: "",
              output: "",
              practise_problems: [],
            },
          },
          {
            topic_id: "T2",
            topic_name: "Features of C",
            show_compiler: false,
            isCompleted: false,
            theory: {
              heading: "Key Features of C",
              paragraph:
                "C is a versatile programming language that provides both low-level access to memory and high-level constructs for structured programming. Its simplicity, speed, and portability have made it a foundation for many modern programming languages.",
              bulletpoints: [
                "Simple and efficient.",
                "Low-level access through pointers.",
                "Structured programming language.",
                "Portability across platforms.",
                "Rich library of functions.",
              ],
              example_code: "",
              output: "",
              practise_problems: [],
            },
          },
          {
            topic_id: "T3",
            topic_name: "Structure of a C Program",
            show_compiler: true,
            isCompleted: false,
            theory: {
              heading: "Basic Structure of a C Program",
              paragraph:
                "Every C program follows a specific structure that makes it easy to write, read, and debug. Understanding this structure is the first step towards writing efficient programs.",
              bulletpoints: [
                "Every C program begins with a `main()` function.",
                "Header files are included using `#include`.",
                "Statements are written inside `{ }` braces.",
                "Each statement ends with a semicolon `;`.",
              ],
              example_code: '#include <stdio.h>\nint main() {\n   printf("Hello, World!\\n");\n   return 0;\n}',
              output: "Hello, World!",
              practise_problems: [
                {
                  question: "Write a C program to print your name.",
                  expected_output: "Your Name",
                },
              ],
            },
          },
          {
            topic_id: "T4",
            topic_name: "Compilation and Execution",
            show_compiler: true,
            isCompleted: false,
            theory: {
              heading: "Compilation and Execution Process",
              paragraph:
                "The process of running a C program involves several steps: writing the source code, compiling it into machine-readable code, linking necessary libraries, and finally executing the program. Understanding this process helps in debugging errors effectively.",
              bulletpoints: [
                "The source code is written in a `.c` file.",
                "Compiler converts source code into object code.",
                "Linker combines object code with libraries.",
                "Executable file is generated and run by the system.",
              ],
              example_code: "gcc program.c -o program\n./program",
              output: "",
              practise_problems: [
                {
                  question: "Write a C program that prints 'Compilation Successful' after execution.",
                  expected_output: "Compilation Successful",
                },
              ],
            },
          },
        ],
      },

      // C2 new
      {
        chapter_id: "C2",
        chapter_name: "Variables and Data Types",
        chapter_description: "Learn how to declare variables, understand data types, and use format specifiers in C.",
        icon: "FileText",
        subtopics: [
          {
            topic_id: "T1",
            topic_name: "Basic Data Types",
            show_compiler: false,
            isCompleted: false,
            theory: {
              heading: "Fundamental Data Types in C",
              paragraph:
                "C provides several built-in data types such as int, float, double, and char. Choosing the correct type ensures proper memory usage and accurate computations.",
              bulletpoints: [
                "`int` for integers",
                "`float` and `double` for floating-point numbers",
                "`char` for characters",
                "Use `sizeof` to check the size of a type",
              ],
              example_code: "",
              output: "",
              practise_problems: [
                {
                  question: "Which data type would you use to store 3.14?",
                  expected_output: "float (or double)",
                },
              ],
            },
          },
          {
            topic_id: "T2",
            topic_name: "Variable Declarations",
            show_compiler: true,
            isCompleted: false,
            theory: {
              heading: "Declaring and Initializing Variables",
              paragraph:
                "Variables must be declared before use. You can optionally initialize them at declaration time to give them a starting value.",
              bulletpoints: [
                "Syntax: `type variableName;`",
                "Initialization: `type variableName = value;`",
                "Multiple declarations: `int a = 1, b = 2;`",
              ],
              example_code:
                "#include <stdio.h>\nint main(){\n  int age = 21; float pi = 3.14f; char grade = 'A';\n  printf(\"%d %.2f %c\\n\", age, pi, grade);\n  return 0;\n}",
              output: "21 3.14 A",
              practise_problems: [
                {
                  question: "Declare an integer variable count with value 10 and print it.",
                  expected_output: "10",
                },
              ],
            },
          },
        ],
      },

      // C3 new
      {
        chapter_id: "C3",
        chapter_name: "Operators and Expressions",
        chapter_description: "Understand arithmetic, relational, logical, and assignment operators in C.",
        icon: "Calculator",
        subtopics: [
          {
            topic_id: "T1",
            topic_name: "Arithmetic Operators",
            show_compiler: true,
            isCompleted: false,
            theory: {
              heading: "Using Arithmetic Operators",
              paragraph:
                "Arithmetic operators perform basic math operations on numeric types. Be mindful of integer division and operator precedence.",
              bulletpoints: [
                "`+`, `-`, `*`, `/`, `%` are arithmetic operators",
                "`/` with integers truncates the result",
                "Use parentheses to control precedence",
              ],
              example_code:
                '#include <stdio.h>\nint main(){\n  int a=7, b=2; printf("%d %d\\n", a/b, a%b);\n  return 0;\n}',
              output: "3 1",
              practise_problems: [
                {
                  question: "Given a=15 and b=4, print a/b and a%b on one line separated by space.",
                  expected_output: "3 3",
                },
              ],
            },
          },
          {
            topic_id: "T2",
            topic_name: "Relational and Logical",
            show_compiler: false,
            isCompleted: false,
            theory: {
              heading: "Relational and Logical Operators",
              paragraph:
                "Relational operators compare values, while logical operators combine boolean expressions. These form the basis of decision making.",
              bulletpoints: [
                "Relational: `==`, `!=`, `>`, `<`, `>=`, `<=`",
                "Logical: `&&`, `||`, `!`",
                "Non-zero is treated as true, zero as false",
              ],
              example_code: "",
              output: "",
              practise_problems: [
                {
                  question: "What is the output of (5 > 3) && (2 == 2) in C?",
                  expected_output: "1",
                },
              ],
            },
          },
        ],
      },

      // C4 new
      {
        chapter_id: "C4",
        chapter_name: "Control Structures",
        chapter_description: "Master if-else, switch, and loops to control program flow.",
        icon: "GitBranch",
        subtopics: [
          {
            topic_id: "T1",
            topic_name: "If-Else and Switch",
            show_compiler: true,
            isCompleted: false,
            theory: {
              heading: "Conditional Statements",
              paragraph:
                "Conditionals allow your program to make decisions. Use if-else for range checks and switch for fixed discrete values.",
              bulletpoints: [
                "`if (condition) { ... } else { ... }`",
                "`switch (expr) { case ... default: }`",
                "Remember to `break` in switch cases",
              ],
              example_code:
                '#include <stdio.h>\nint main(){\n  int x=2; switch(x){case 1: printf("one"); break; case 2: printf("two"); break; default: printf("other");}\n  return 0;\n}',
              output: "two",
              practise_problems: [
                {
                  question: "Read an integer and print positive, negative, or zero using if-else.",
                  expected_output: "positive | negative | zero (based on input)",
                },
              ],
            },
          },
          {
            topic_id: "T2",
            topic_name: "Loops",
            show_compiler: true,
            isCompleted: false,
            theory: {
              heading: "For, While, and Do-While",
              paragraph:
                "Loops repeat a block of code. Choose the loop based on whether you know the iteration count and when the condition should be checked.",
              bulletpoints: [
                "`for (init; cond; inc)` common for counted loops",
                "`while (cond)` checks before the first iteration",
                "`do { ... } while (cond);` runs at least once",
              ],
              example_code: '#include <stdio.h>\nint main(){\n  for(int i=1;i<=3;i++){ printf("%d ", i);} return 0;\n}',
              output: "1 2 3 ",
              practise_problems: [
                {
                  question: "Print the sum of the first N natural numbers using a loop for N=5.",
                  expected_output: "15",
                },
              ],
            },
          },
        ],
      },
    ],
  },
}
