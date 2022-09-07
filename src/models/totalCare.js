import React from 'react'
import"./css/TotalCare.css"
import"../App.css"
const TotalCare = () => {
  return (
    <div className='paddingTop'>
    <div id="faqs" className="container">
        <div className="row mb-4">
            <div className="col-9 mx-auto py-5 mb-3">

                <h4 className="text-center mt-2 mb-4 display-6 total">Total Care</h4>

                <div className="accordion accordion-flush fs" id="accordionFlushExample">
                    <div className="accordion-item border">
                      <h2 className="accordion-header" id="flush-headingOne">
                        <button className="accordion-button collapsed fs" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                            How do I know where to begin with my new MedMinder unit?
                        </button>
                      </h2>
                      <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                        <div className="accordion-body">Your unit comes with a comprehensive step-by-step instruction brochure that is easy to understand and follow. If you have any questions, the MedMinder Customer Service staff is always just a phone call away.</div>
                      </div>
                    </div>
                    <div className="accordion-item border">
                      <h2 className="accordion-header" id="flush-headingTwo">
                        <button className="accordion-button collapsed fs" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                            Do I need to have Internet access at home in order to use MedMinder?
                        </button>
                      </h2>
                      <div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                        <div className="accordion-body">No. There is no need for a computer or any other type of Internet access.</div>
                      </div>
                    </div>
                    <div className="accordion-item border">
                      <h2 className="accordion-header" id="flush-headingThree">
                        <button className="accordion-button collapsed fs" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                            What if I need to change my medication schedule during the week?
                        </button>
                      </h2>
                      <div id="flush-collapseThree" className="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                        <div className="accordion-body">You can always change your medication schedule or any of your preferences by accessing your account at www.medminder.com. You can also call MedMinder and we will make the requested changes for you.</div>
                      </div>
                    </div>
                  </div>

            </div>
        </div>
    </div>
    </div>
  )
}

export default TotalCare
