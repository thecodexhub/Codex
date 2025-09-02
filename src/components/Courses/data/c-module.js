export const cModule = {
  module: {
    module_id: "P1",
    chapters: [
      // C1 from user-provided schema (now with paragraph)
      {
  chapter_id: "P1-C1",
  chapter_name: "Chapter 1 : Introduction to C Programming",
  chapter_description:
    "This chapter introduces the C programming language, its history, features, and the basic structure of a C program.",
  icon: "BookOpen",
  subtopics: [
    {
      topic_id: "P1-C1-T1",
      topic_name: "History of C",
      show_compiler: false,
      isCompleted: false,
      theory: {
        heading: "History of C Language",
        paragraph:
          "The C language was developed to provide a powerful and efficient tool for system programming. It has since become one of the most widely used programming languages in the world.",
        bulletpoints: [
          "C was developed in 1972 by Dennis Ritchie at Bell Labs.",
          "It was designed as a successor to the B language.",
          "C played a crucial role in the development of operating systems.",
          "The UNIX operating system was one of the first major projects written in C."
        ],
        example_code: "",
        output: "",
        practise_problems: []
      }
    },
    {
      topic_id: "P1-C1-T2",
      topic_name: "Features of C",
      show_compiler: false,
      isCompleted: false,
      theory: {
        heading: "Key Features of C",
        paragraph:
          "C provides a balance between low-level programming (close to hardware) and high-level structured programming. Its versatility and performance make it a foundation for many modern languages.",
        bulletpoints: [
          "Simple and efficient programming language.",
          "Provides low-level access through pointers.",
          "Supports structured programming and modularity.",
          "Highly portable across platforms.",
          "Rich library of built-in functions."
        ],
        example_code: "",
        output: "",
        practise_problems: []
      }
    },
    {
      topic_id: "P1-C1-T3",
      topic_name: "Structure of a C Program",
      show_compiler: true,
      isCompleted: false,
      theory: {
        heading: "Basic Structure of a C Program",
        paragraph:
          "A C program follows a well-defined structure that makes it easier to write, compile, and debug. Understanding this structure is essential for writing valid C code.",
        bulletpoints: [
          "Every C program starts with the `main()` function.",
          "Header files are included using `#include`.",
          "Code is grouped inside `{ }` braces.",
          "Each statement must end with a semicolon `;`."
        ],
        example_code:
          "#include <stdio.h>\n\nint main() {\n    printf(\"Hello, World!\\n\");\n    return 0;\n}",
        output: "Hello, World!",
        practise_problems: [
          {
            question: "Write a C program to print your full name.",
            expected_output: "Your Full Name"
          },
          {
            question: "Write a C program to print 'Welcome to C Programming'.",
            expected_output: "Welcome to C Programming"
          }
        ]
      }
    },
    {
      topic_id: "P1-C1-T4",
      topic_name: "Compilation and Execution",
      show_compiler: true,
      isCompleted: false,
      theory: {
        heading: "Compilation and Execution Process",
        paragraph:
          "The process of running a C program involves writing source code, compiling it into object code, linking libraries, and executing the final program.",
        bulletpoints: [
          "Source code is saved in a `.c` file.",
          "The compiler translates source code into object code.",
          "The linker combines object code with libraries.",
          "An executable file is generated and executed by the system."
        ],
        example_code: "gcc program.c -o program\n./program",
        output: "",
        practise_problems: [
          {
            question: "Write a C program that prints 'Compilation Successful'.",
            expected_output: "Compilation Successful"
          },
          {
            question: "Explain the role of a compiler and linker in C programming.",
            expected_output:
              "Compiler converts source code into object code, linker combines it with libraries to generate an executable."
          }
        ]
      }
    }
  ]
},


      // C2 new
      {
  chapter_id: "P1-C2",
  chapter_name: "Chapter 2 : Variables, Constants, and Data Types",
  chapter_description:
    "This chapter explains how to define variables, constants, data types, and how to use input/output functions in C programming.",
  icon: "Code",
  subtopics: [
    {
      topic_id: "P1-C2-T1",
      topic_name: "Identifiers and Keywords",
      show_compiler: false,
      isCompleted: false,
      theory: {
        heading: "Identifiers and Keywords",
        paragraph:
          "Identifiers are names given to variables, functions, and other entities in a program. Keywords are reserved words in C that have predefined meanings and cannot be used as identifiers.",
        bulletpoints: [
          "Identifiers must begin with a letter or underscore.",
          "They can contain letters, digits, and underscores.",
          "Keywords are predefined reserved words like `int`, `return`, `if`.",
          "C has 32 standard keywords."
        ],
        example_code:
          "int age;\nfloat salary;\nchar name[20];\n// 'int', 'float', 'char' are keywords, while 'age', 'salary', 'name' are identifiers.",
        output: "",
        practise_problems: [
          {
            question: "Write a valid identifier for storing the roll number of a student.",
            expected_output: "studentRollNo"
          },
          {
            question: "List any 5 keywords in C.",
            expected_output: "int, char, float, return, if"
          }
        ]
      }
    },
    {
      topic_id: "P1-C2-T2",
      topic_name: "Constants and Literals",
      show_compiler: false,
      isCompleted: false,
      theory: {
        heading: "Constants and Literals",
        paragraph:
          "Constants are values that cannot be changed during program execution. Literals are fixed values written directly into the code.",
        bulletpoints: [
          "Integer constants: e.g., 10, -25",
          "Floating-point constants: e.g., 3.14, -0.5",
          "Character constants: e.g., 'a', 'Z'",
          "String literals: e.g., \"Hello\"",
          "Defined using `#define` or `const` keyword"
        ],
        example_code:
          "#include <stdio.h>\n\n#define PI 3.14\n\nint main() {\n    const int MAX = 100;\n    printf(\"Value of PI: %f\\n\", PI);\n    printf(\"Max value: %d\\n\", MAX);\n    return 0;\n}",
        output: "Value of PI: 3.140000\nMax value: 100",
        practise_problems: [
          {
            question: "Define a constant named LIMIT with a value of 500.",
            expected_output: "#define LIMIT 500"
          },
          {
            question: "Write a program to print the value of a constant named RATE = 9.5.",
            expected_output: "9.5"
          }
        ]
      }
    },
    {
      topic_id: "P1-C2-T3",
      topic_name: "Variables and Data Types",
      show_compiler: true,
      isCompleted: false,
      theory: {
        heading: "Variables and Data Types",
        paragraph:
          "Variables are used to store data in memory, and each variable has a data type that defines the kind of values it can hold.",
        bulletpoints: [
          "Basic data types: int, float, char, double",
          "Variables must be declared before use",
          "Variable syntax: data_type variable_name;",
          "Initialization: assigning an initial value to a variable"
        ],
        example_code:
          "#include <stdio.h>\n\nint main() {\n    int age = 20;\n    float salary = 35000.50;\n    char grade = 'A';\n\n    printf(\"Age: %d\\n\", age);\n    printf(\"Salary: %.2f\\n\", salary);\n    printf(\"Grade: %c\\n\", grade);\n    return 0;\n}",
        output: "Age: 20\nSalary: 35000.50\nGrade: A",
        practise_problems: [
          {
            question: "Declare a float variable 'temperature' and assign it the value 36.5.",
            expected_output: "float temperature = 36.5;"
          },
          {
            question: "Write a program to declare and print an integer and a character variable.",
            expected_output: "Integer and Character values printed"
          }
        ]
      }
    },
    {
      topic_id: "P1-C2-T4",
      topic_name: "printf and scanf",
      show_compiler: true,
      isCompleted: false,
      theory: {
        heading: "Input and Output Functions: printf() and scanf()",
        paragraph:
          "C provides printf() for output and scanf() for input. These functions are defined in the stdio.h library.",
        bulletpoints: [
          "printf() is used to display output on the screen.",
          "scanf() is used to take input from the user.",
          "Format specifiers: %d (int), %f (float), %c (char), %s (string).",
          "Multiple values can be printed or scanned in one statement."
        ],
        example_code:
          "#include <stdio.h>\n\nint main() {\n    int age;\n    printf(\"Enter your age: \");\n    scanf(\"%d\", &age);\n    printf(\"You entered: %d\\n\", age);\n    return 0;\n}",
        output: "Enter your age: 25\nYou entered: 25",
        practise_problems: [
          {
            question: "Write a program to input two integers and print their sum.",
            expected_output: "Sum of two integers"
          },
          {
            question: "Write a program to read a character from the user and display it.",
            expected_output: "Character entered by user"
          }
        ]
      }
    }
  ]
},

      // C3 new
      {
  chapter_id: "P1-C3",
  chapter_name: "Chapter 3 : Operators in C",
  chapter_description:
    "This chapter covers different types of operators in C such as arithmetic, relational, logical, assignment, increment/decrement, bitwise, and special operators that are used to perform operations on data.",
  icon: "Calculator",
  subtopics: [
    {
      topic_id: "P1-C3-T1",
      topic_name: "Arithmetic Operators",
      show_compiler: true,
      isCompleted: false,
      theory: {
        heading: "Arithmetic Operators in C",
        paragraph:
          "Arithmetic operators are used to perform mathematical operations on variables and constants in C.",
        bulletpoints: [
          "Addition (+): Adds two operands.",
          "Subtraction (-): Subtracts right operand from left.",
          "Multiplication (*): Multiplies two operands.",
          "Division (/): Divides left operand by right.",
          "Modulus (%): Returns the remainder after division."
        ],
        example_code:
          "#include <stdio.h>\n\nint main() {\n    int a = 10, b = 3;\n    printf(\"Addition: %d\\n\", a + b);\n    printf(\"Subtraction: %d\\n\", a - b);\n    printf(\"Multiplication: %d\\n\", a * b);\n    printf(\"Division: %d\\n\", a / b);\n    printf(\"Modulus: %d\\n\", a % b);\n    return 0;\n}",
        output:
          "Addition: 13\nSubtraction: 7\nMultiplication: 30\nDivision: 3\nModulus: 1",
        practise_problems: [
          {
            question: "Write a C program to input two numbers and print their product.",
            expected_output: "Product of two numbers"
          },
          {
            question: "Write a program to find the remainder when 29 is divided by 5.",
            expected_output: "4"
          }
        ]
      }
    },
    {
      topic_id: "P1-C3-T2",
      topic_name: "Relational & Logical Operators",
      show_compiler: true,
      isCompleted: false,
      theory: {
        heading: "Relational and Logical Operators",
        paragraph:
          "Relational operators are used to compare values, while logical operators are used to combine multiple conditions.",
        bulletpoints: [
          "Relational: >, <, >=, <=, ==, !=",
          "Logical AND (&&): true if both conditions are true.",
          "Logical OR (||): true if at least one condition is true.",
          "Logical NOT (!): reverses the result of a condition."
        ],
        example_code:
          "#include <stdio.h>\n\nint main() {\n    int x = 10, y = 20;\n\n    printf(\"x > y: %d\\n\", x > y);\n    printf(\"x < y: %d\\n\", x < y);\n    printf(\"(x < y) && (y > 5): %d\\n\", (x < y) && (y > 5));\n    printf(\"(x > y) || (y > 5): %d\\n\", (x > y) || (y > 5));\n    printf(\"!(x == y): %d\\n\", !(x == y));\n    return 0;\n}",
        output:
          "x > y: 0\nx < y: 1\n(x < y) && (y > 5): 1\n(x > y) || (y > 5): 1\n!(x == y): 1",
        practise_problems: [
          {
            question: "Write a program to check if a number is greater than 100 and even.",
            expected_output: "True/False result"
          },
          {
            question: "Write a program to check if a student has passed (marks >= 40) and grade is not 'F'.",
            expected_output: "Pass/Fail result"
          }
        ]
      }
    },
    {
      topic_id: "P1-C3-T3",
      topic_name: "Assignment & Increment/Decrement",
      show_compiler: true,
      isCompleted: false,
      theory: {
        heading: "Assignment and Increment/Decrement Operators",
        paragraph:
          "Assignment operators are used to assign values to variables, while increment/decrement operators are used to increase or decrease values.",
        bulletpoints: [
          "Assignment (=): Assigns right value to left variable.",
          "Compound assignment: +=, -=, *=, /=, %=",
          "Increment (++) increases value by 1.",
          "Decrement (--) decreases value by 1.",
          "Can be used in prefix (++a, --a) or postfix (a++, a--) form."
        ],
        example_code:
          "#include <stdio.h>\n\nint main() {\n    int a = 5;\n    a += 3;  // a = a + 3\n    printf(\"After += 3: %d\\n\", a);\n    a--;\n    printf(\"After decrement: %d\\n\", a);\n    ++a;\n    printf(\"After increment: %d\\n\", a);\n    return 0;\n}",
        output: "After += 3: 8\nAfter decrement: 7\nAfter increment: 8",
        practise_problems: [
          {
            question: "Write a program that increases a number by 10 using += operator.",
            expected_output: "Number increased by 10"
          },
          {
            question: "Demonstrate difference between prefix and postfix increment.",
            expected_output: "Different values for prefix and postfix"
          }
        ]
      }
    },
    {
      topic_id: "P1-C3-T4",
      topic_name: "Bitwise & Special Operators",
      show_compiler: true,
      isCompleted: false,
      theory: {
        heading: "Bitwise and Special Operators",
        paragraph:
          "Bitwise operators operate at the binary level of integers. Special operators like sizeof and conditional operator provide additional functionality in C.",
        bulletpoints: [
          "Bitwise AND (&), OR (|), XOR (^), NOT (~), Left Shift (<<), Right Shift (>>).",
          "sizeof: returns the size of a variable or data type.",
          "Conditional operator (?:): shorthand for if-else.",
          "Comma operator (,): evaluates multiple expressions.",
          "Pointer operator (& for address, * for value at address)."
        ],
        example_code:
          "#include <stdio.h>\n\nint main() {\n    int a = 5, b = 3;\n    printf(\"a & b: %d\\n\", a & b);\n    printf(\"a | b: %d\\n\", a | b);\n    printf(\"a ^ b: %d\\n\", a ^ b);\n    printf(\"~a: %d\\n\", ~a);\n    printf(\"a << 1: %d\\n\", a << 1);\n    printf(\"a >> 1: %d\\n\", a >> 1);\n\n    printf(\"Size of int: %lu bytes\\n\", sizeof(int));\n    int x = (a > b) ? a : b;\n    printf(\"Greater number: %d\\n\", x);\n    return 0;\n}",
        output:
          "a & b: 1\na | b: 7\na ^ b: 6\n~a: -6\na << 1: 10\na >> 1: 2\nSize of int: 4 bytes\nGreater number: 5",
        practise_problems: [
          {
            question: "Write a program to check if a number is odd or even using bitwise operator.",
            expected_output: "Odd/Even result"
          },
          {
            question: "Use the conditional operator to find the largest of three numbers.",
            expected_output: "Largest number"
          }
        ]
      }
    }
  ]
},

      // C4 new
      {
  chapter_id: "P1-C4",
  chapter_name: "Chapter 4 : Control Structures",
  chapter_description:
    "This chapter explains how to control the flow of execution in a C program using decision-making statements, switch-case, loops, and jump statements.",
  icon: "GitBranch",
  subtopics: [
    {
      topic_id: "P1-C4-T1",
      topic_name: "if, if-else, nested if",
      show_compiler: true,
      isCompleted: false,
      theory: {
        heading: "Decision Making using if, if-else, and nested if",
        paragraph:
          "C provides conditional statements to execute different blocks of code based on conditions. The if statement checks a condition, if-else allows two-way branching, and nested if enables multiple condition checks.",
        bulletpoints: [
          "`if`: Executes a block if condition is true.",
          "`if-else`: Executes one block if condition is true, another if false.",
          "`nested if`: An if inside another if for multiple conditions.",
          "Conditions must return true (non-zero) or false (zero)."
        ],
        example_code:
          "#include <stdio.h>\n\nint main() {\n    int marks = 85;\n\n    if (marks >= 90) {\n        printf(\"Grade: A\\n\");\n    } else if (marks >= 75) {\n        printf(\"Grade: B\\n\");\n    } else {\n        printf(\"Grade: C\\n\");\n    }\n\n    return 0;\n}",
        output: "Grade: B",
        practise_problems: [
          {
            question: "Write a program to check whether a number is positive, negative, or zero.",
            expected_output: "Positive/Negative/Zero"
          },
          {
            question: "Write a program to find the largest of three numbers using nested if.",
            expected_output: "Largest number"
          }
        ]
      }
    },
    {
      topic_id: "P1-C4-T2",
      topic_name: "switch-case",
      show_compiler: true,
      isCompleted: false,
      theory: {
        heading: "Switch-Case Statement",
        paragraph:
          "The switch-case statement allows multi-way branching based on the value of a variable or expression. It is an alternative to multiple if-else statements.",
        bulletpoints: [
          "Expression inside switch must be integer or character type.",
          "Each case is followed by a value and a colon.",
          "`break` is used to exit the switch after a case executes.",
          "The `default` case executes if no match is found."
        ],
        example_code:
          "#include <stdio.h>\n\nint main() {\n    int day = 3;\n\n    switch (day) {\n        case 1: printf(\"Monday\\n\"); break;\n        case 2: printf(\"Tuesday\\n\"); break;\n        case 3: printf(\"Wednesday\\n\"); break;\n        default: printf(\"Invalid day\\n\");\n    }\n\n    return 0;\n}",
        output: "Wednesday",
        practise_problems: [
          {
            question: "Write a program to display the name of a month using switch-case.",
            expected_output: "Month name"
          },
          {
            question: "Write a program to implement a simple calculator using switch-case.",
            expected_output: "Addition, subtraction, etc."
          }
        ]
      }
    },
    {
      topic_id: "P1-C4-T3",
      topic_name: "Loops (for, while, do-while)",
      show_compiler: true,
      isCompleted: false,
      theory: {
        heading: "Loops in C",
        paragraph:
          "Loops allow executing a block of code repeatedly until a condition is met. C provides three main types of loops: for, while, and do-while.",
        bulletpoints: [
          "`for` loop: Best for known number of iterations.",
          "`while` loop: Repeats as long as condition is true.",
          "`do-while` loop: Executes block at least once before checking condition.",
          "Loops reduce redundancy and improve efficiency."
        ],
        example_code:
          "#include <stdio.h>\n\nint main() {\n    int i;\n\n    printf(\"For Loop: \");\n    for (i = 1; i <= 5; i++) {\n        printf(\"%d \", i);\n    }\n\n    printf(\"\\nWhile Loop: \");\n    i = 1;\n    while (i <= 5) {\n        printf(\"%d \", i);\n        i++;\n    }\n\n    printf(\"\\nDo-While Loop: \");\n    i = 1;\n    do {\n        printf(\"%d \", i);\n        i++;\n    } while (i <= 5);\n\n    return 0;\n}",
        output: "For Loop: 1 2 3 4 5 \nWhile Loop: 1 2 3 4 5 \nDo-While Loop: 1 2 3 4 5",
        practise_problems: [
          {
            question: "Write a program to print the first 10 natural numbers using a for loop.",
            expected_output: "1 2 3 4 5 6 7 8 9 10"
          },
          {
            question: "Write a program to calculate the sum of digits of a number using a while loop.",
            expected_output: "Sum of digits"
          }
        ]
      }
    },
    {
      topic_id: "P1-C4-T4",
      topic_name: "break and continue",
      show_compiler: true,
      isCompleted: false,
      theory: {
        heading: "Jump Statements: break and continue",
        paragraph:
          "break and continue are jump statements used inside loops and switch-case. They alter the normal flow of execution.",
        bulletpoints: [
          "`break`: Immediately exits from the loop or switch.",
          "`continue`: Skips the current iteration and moves to the next.",
          "Useful for controlling loop execution efficiently.",
          "Can be combined with conditions for flexible control."
        ],
        example_code:
          "#include <stdio.h>\n\nint main() {\n    int i;\n    for (i = 1; i <= 5; i++) {\n        if (i == 3) continue;\n        if (i == 5) break;\n        printf(\"%d \", i);\n    }\n    return 0;\n}",
        output: "1 2 4",
        practise_problems: [
          {
            question: "Write a program that prints numbers from 1 to 10 but skips 5 using continue.",
            expected_output: "1 2 3 4 6 7 8 9 10"
          },
          {
            question: "Write a program that prints numbers from 1 to 20 but stops when it reaches 12.",
            expected_output: "1 2 3 ... 12"
          }
        ]
      }
    }
  ]
},
{
  chapter_id: "P1-C5",
  chapter_name: "Chapter 5 : Functions in C",
  chapter_description: "Functions in C help in modular programming by breaking down code into reusable blocks. This chapter covers declaration, definition, arguments, return types, recursion, and storage classes.",
  icon: "FunctionSquare",
  subtopics: [
    {
      topic_id: "P1-C5-T1",
      topic_name: "Function Declaration & Definition",
      show_compiler: true,
      isCompleted: false,
      theory: {
        heading: "Function Declaration & Definition",
        paragraph: "A function in C is a block of code that performs a specific task. Functions can be declared before they are used and defined later. The declaration tells the compiler about the function's name, return type, and parameters, while the definition provides the actual body of the function.",
        bulletpoints: [
          "Declaration: Specifies the function's return type, name, and parameters.",
          "Definition: Provides the body of the function with actual code.",
          "Return type can be void if the function does not return a value.",
          "Functions help in reusability and modularity."
        ],
        example_code: "#include <stdio.h>\n\n// Function Declaration\nint add(int, int);\n\nint main() {\n    int result = add(5, 10);\n    printf(\"Sum = %d\", result);\n    return 0;\n}\n\n// Function Definition\nint add(int a, int b) {\n    return a + b;\n}",
        output: "Sum = 15",
        practise_problems: [
          {
            question: "Write a function multiply(int a, int b) that returns the product of two numbers.",
            expected_output: "If inputs are 4 and 5, output should be 20."
          }
        ]
      }
    },
    {
      topic_id: "P1-C5-T2",
      topic_name: "Function Arguments & Return Types",
      show_compiler: true,
      isCompleted: false,
      theory: {
        heading: "Function Arguments & Return Types",
        paragraph: "Functions in C can accept input values called arguments (or parameters) and may return a value using the return statement. Depending on the situation, a function can have arguments, return a value, both, or neither.",
        bulletpoints: [
          "Arguments provide input data to functions.",
          "The return type specifies what type of value a function will return.",
          "Functions can return only one value at a time.",
          "Functions can also have no return type (void)."
        ],
        example_code: "#include <stdio.h>\n\nint square(int n) {\n    return n * n;\n}\n\nint main() {\n    int num = 6;\n    printf(\"Square = %d\", square(num));\n    return 0;\n}",
        output: "Square = 36",
        practise_problems: [
          {
            question: "Write a function that takes two integers and returns the larger one.",
            expected_output: "If inputs are 7 and 10, output should be 10."
          }
        ]
      }
    },
    {
      topic_id: "P1-C5-T3",
      topic_name: "Recursion",
      show_compiler: true,
      isCompleted: false,
      theory: {
        heading: "Recursion",
        paragraph: "Recursion is the process in which a function calls itself either directly or indirectly. Recursive functions are often used to solve problems that can be broken down into smaller subproblems of the same type.",
        bulletpoints: [
          "A recursive function must have a base case to avoid infinite recursion.",
          "Commonly used for problems like factorial, Fibonacci, and tree traversal.",
          "Recursion uses the function call stack for execution.",
          "Without a base case, recursion leads to stack overflow."
        ],
        example_code: "#include <stdio.h>\n\nint factorial(int n) {\n    if (n == 0)\n        return 1;\n    else\n        return n * factorial(n - 1);\n}\n\nint main() {\n    int num = 5;\n    printf(\"Factorial = %d\", factorial(num));\n    return 0;\n}",
        output: "Factorial = 120",
        practise_problems: [
          {
            question: "Write a recursive function to find the nth Fibonacci number.",
            expected_output: "If input is 6, output should be 8."
          }
        ]
      }
    },
    {
      topic_id: "P1-C5-T4",
      topic_name: "Storage Classes",
      show_compiler: false,
      isCompleted: false,
      theory: {
        heading: "Storage Classes",
        paragraph: "Storage classes in C define the scope (visibility), lifetime, and linkage of variables or functions. They help determine how and where variables are stored and accessed during program execution.",
        bulletpoints: [
          "auto: Default storage class for local variables.",
          "static: Retains the value of a variable between function calls.",
          "extern: Used to declare a global variable defined in another file.",
          "register: Requests the compiler to store the variable in CPU registers for faster access."
        ],
        example_code: "#include <stdio.h>\n\nvoid demo() {\n    static int count = 0;\n    count++;\n    printf(\"Count = %d\\n\", count);\n}\n\nint main() {\n    demo();\n    demo();\n    demo();\n    return 0;\n}",
        output: "Count = 1\nCount = 2\nCount = 3",
        practise_problems: [
          {
            question: "Write a program using a static variable to count how many times a function is called.",
            expected_output: "Each call should increment and display the counter value."
          }
        ]
      }
    }
  ]
},
{
  chapter_id: "P1-C6",
  chapter_name: "Chapter 6 : Arrays in C",
  chapter_description: "Arrays in C allow storing multiple values of the same data type under a single variable name. They provide an efficient way to organize and process data in bulk.",
  icon: "Layers",
  subtopics: [
    {
      topic_id: "P1-C6-T1",
      topic_name: "One-Dimensional Arrays",
      show_compiler: true,
      isCompleted: false,
      theory: {
        heading: "Introduction to One-Dimensional Arrays",
        paragraph: "A one-dimensional array is a linear list of elements stored in contiguous memory locations. It is the simplest form of an array.",
        bulletpoints: [
          "An array holds elements of the same type.",
          "Array elements are accessed using their index (starting at 0).",
          "The size of an array must be defined before use."
        ],
        example_code: "#include <stdio.h>\nint main() {\n    int arr[5] = {1, 2, 3, 4, 5};\n    for(int i=0; i<5; i++) {\n        printf(\"%d \", arr[i]);\n    }\n    return 0;\n}",
        output: "1 2 3 4 5",
        practise_problems: [
          {
            question: "Declare an array of size 10 and print all its elements.",
            expected_output: "Elements printed in order"
          }
        ]
      }
    },
    {
      topic_id: "P1-C6-T2",
      topic_name: "Two-Dimensional Arrays",
      show_compiler: true,
      isCompleted: false,
      theory: {
        heading: "Introduction to Two-Dimensional Arrays",
        paragraph: "Two-dimensional arrays are used to represent data in rows and columns, similar to a matrix or a table.",
        bulletpoints: [
          "Declared using two sizes: rows and columns.",
          "Accessed using two indices: arr[row][column].",
          "Commonly used in mathematical and tabular data processing."
        ],
        example_code: "#include <stdio.h>\nint main() {\n    int arr[2][3] = {{1, 2, 3}, {4, 5, 6}};\n    for(int i=0; i<2; i++) {\n        for(int j=0; j<3; j++) {\n            printf(\"%d \", arr[i][j]);\n        }\n        printf(\"\\n\");\n    }\n    return 0;\n}",
        output: "1 2 3\n4 5 6",
        practise_problems: [
          {
            question: "Create a 3x3 matrix and print it.",
            expected_output: "Matrix elements in 3 rows and 3 columns"
          }
        ]
      }
    },
    {
      topic_id: "P1-C6-T3",
      topic_name: "Multi-Dimensional Arrays",
      show_compiler: true,
      isCompleted: false,
      theory: {
        heading: "Introduction to Multi-Dimensional Arrays",
        paragraph: "Multi-dimensional arrays extend beyond two dimensions and are often used in advanced applications like 3D graphics and simulations.",
        bulletpoints: [
          "Declared with more than two dimensions.",
          "Commonly used for 3D matrices or higher-order data.",
          "Accessed using multiple indices."
        ],
        example_code: "#include <stdio.h>\nint main() {\n    int arr[2][2][2] = {{{1,2},{3,4}},{{5,6},{7,8}}};\n    for(int i=0; i<2; i++) {\n        for(int j=0; j<2; j++) {\n            for(int k=0; k<2; k++) {\n                printf(\"%d \", arr[i][j][k]);\n            }\n            printf(\"\\n\");\n        }\n        printf(\"\\n\");\n    }\n    return 0;\n}",
        output: "1 2\n3 4\n\n5 6\n7 8",
        practise_problems: [
          {
            question: "Declare a 3x3x3 array and initialize it with numbers 1–27. Print the cube layer by layer.",
            expected_output: "Cube printed layer by layer"
          }
        ]
      }
    },
    {
      topic_id: "P1-C6-T4",
      topic_name: "Array Operations",
      show_compiler: true,
      isCompleted: false,
      theory: {
        heading: "Operations on Arrays",
        paragraph: "Array operations include traversal, insertion, deletion, searching, and sorting. They help manage and process array elements effectively.",
        bulletpoints: [
          "Traversal: Accessing and displaying elements.",
          "Insertion: Adding new elements at specific positions.",
          "Deletion: Removing elements from an array.",
          "Searching: Finding an element in an array.",
          "Sorting: Arranging elements in order (ascending/descending)."
        ],
        example_code: "#include <stdio.h>\nint main() {\n    int arr[5] = {10, 20, 30, 40, 50};\n    int search = 30, found = 0;\n    for(int i=0; i<5; i++) {\n        if(arr[i] == search) {\n            printf(\"Element %d found at index %d\\n\", search, i);\n            found = 1;\n            break;\n        }\n    }\n    if(!found) printf(\"Element not found\");\n    return 0;\n}",
        output: "Element 30 found at index 2",
        practise_problems: [
          {
            question: "Write a program to insert an element at the end of an array.",
            expected_output: "Array with new element inserted"
          },
          {
            question: "Write a program to sort an array in ascending order.",
            expected_output: "Array elements printed in ascending order"
          }
        ]
      }
    }
  ]
}



    ],
  },
}
