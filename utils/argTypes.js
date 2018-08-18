  "use strict"
  
  const argTypes = (args) => {
    //check that each arg matches the type it's supposed to
    args.forEach((arg, index) => {
      if (typeof arg[0] !== arg[1]) {
        console.error(`ArgTypes: argument ${index} is of type ${typeof arg[0]}, not of type ${arg[1]}`);
      };
    });  
  };

  export default argTypes;