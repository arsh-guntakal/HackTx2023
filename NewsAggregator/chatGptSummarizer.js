import OpenAI from "openai";

const openai = new OpenAI({ apiKey: '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' });
let myMsg;

async function queryGPT(query){
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": query}],
    });
    
     //console.log(response)
    const message = response.choices[0].message.content
    const finishReason = response.choices[0].finish_reason
    if(finishReason === 'stop'){
      return message
    }else{
      return null;
    }
}

function main(){
    const query = "Where was it held?"
    let output; 
    let tryQuery = queryGPT(query).then(result =>{
      output = result
    })
    console.log(output);
    

}

main();

