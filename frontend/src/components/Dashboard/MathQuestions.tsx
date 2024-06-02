import React, {useState} from 'react'

export default function MathQuestions({ question, generate }: any) {

    const [showAnswer, setShowAnswer] = useState(true)



    return (
        <div className="w-[90%] h-48 bg-white glassMorphism rounded-2xl flex p-6 px-12 items-center">
            <div className={"w-[53%]"}>
                <h2>Your Math Question:</h2> <br/>
                <p className="pl-5">- {question?.question}</p> <br/>
                <button
                    onClick={() => {
                        setShowAnswer(true)
                        generate()
                    }}
                    className="block w-[25%] rounded-3xl hover:bg-orange-600 bg-orange-500 px-3 py-3 text-sm font-medium text-white"
                >
                    Generate
                </button>
            </div>

            <div className={"w-[47%]"}>
                <h2>Answer:</h2> <br/>
                <p className={`ml-5 ${showAnswer && "bg-black"}`}>{question?.answer}</p> <br/>
                <button
                    onClick={() => setShowAnswer(false)}
                    className="block w-[35%] rounded-3xl hover:bg-green-800 bg-green-700 px-3 py-3 text-sm font-medium text-white"
                >
                    Show Answer
                </button>
            </div>

        </div>
    );
}
