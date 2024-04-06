function lexer(input) {
  const tokens = [];
  let cursor = 0;

  while (cursor < input.length) {
    let char = input[cursor];

    //Skip whitespace
    if (/\s/.test(char)) {
      cursor++;
      continue;
    }

    //If our character is a alphabet, we will try to form words.
    if (/[a-zA-Z]/.test(char)) {
      let word = "";
      while (/[a-zA-Z0-9]/.test(char)) {
        word += char;
        char = input[++cursor];
      }
      if (word == "ye" || word == "bol") {
        tokens.push({ type: "keyword", value: word });
      } else {
        tokens.push({ type: "variable", value: word });
      }
      continue;
    }

    //If we get a number
    if (/[0-9]/.test(char)) {
      let num = "";
      while (/[0-9]/.test(char)) {
        num += char;
        char = input[++cursor];
      }
      tokens.push({ type: "number", value: parseInt(num) });
      continue;
    }

    //Tokenize operators and equals sign
    if (/[\+\-\*\/=]/.test(char)) {
      tokens.push({ type: "operator", value: char });
      cursor++;
      continue;
    }
  }
  return tokens;
}

function parser(tokens) {
  const ast = {
    type: "Program",
    body: [],
  };
  while (tokens.length > 0) {
    let token = tokens.shift();
    if (token.type === "keyword" && token.value === "ye") {
      let declaration = {
        type: "Declaration",
        name: tokens.shift().value,
        value: null,
      };
      //Check for assignment
      if (tokens[0].type === "operator" && tokens[0].value === "=") {
        tokens.shift(); //consume '='
        //Parse the expression
        let expression = ""; //eg 10+20
        while (tokens.length > 0 && tokens[0].type !== "keyword") {
          expression += tokens.shift().value;
        }
        declaration.value = expression.trim();
      }
      ast.body.push(declaration);
    }
    if (token.type === "keyword" && token.value === "bol") {
      ast.body.push({
        type: "Print",
        expression: tokens.shift().value,
      });
    }
  }
  return ast;
}

function codeGenerator(node) {
  //Recursivel generating the code for the body of AST
  switch (node.type) {
    case "Program":
      return node.body.map(codeGenerator).join("\n");
    case "Declaration":
      return `const ${node.name}=${node.value};`;
    case "Print":
      return `console.log(${node.expression})`;
  }
}

function compiler(input) {
  const tokens = lexer(input);
  const ast = parser(tokens);
  const executableCode = codeGenerator(ast);
  return executableCode;
  //   console.log(executableCode);
}

function runner(input) {
  eval(input);
}

const code = `
ye x=10
ye y=20

ye sum=x/y
bol sum
`;

const exec = compiler(code);
runner(exec);
