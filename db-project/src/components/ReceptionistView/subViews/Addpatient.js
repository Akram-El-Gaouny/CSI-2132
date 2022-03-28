import "./subViews.css"


const  Addpatient = () => {

    let user = {
        first: null,
        middle: null,
        last: null,
        email: null,
        password: null,
        housenumber: null,
        street: null,
        city: null,
        province: null,
        role: "patient",
        dateOfBirth: null,
        age: null,
        SSN: null,
    }

    
    return ( 
        <div className="Addpatient subViewOutline m-5">
            <div className="row m-5">
                <div className="col subViewTitle text-center">
                Add Patient
                </div>
            </div>

            <div className="row">
                <div className="col text-center">
                Add Patient
                </div>
            </div>

            
        </div>
     );

}
 
export default Addpatient ;