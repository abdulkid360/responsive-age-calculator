
const setError = function (input, message = "This field is required") {
    input.classList.add('error-border');
    input.parentElement.querySelector('.form-label').classList.add('error-text');
    input.parentElement.querySelector('.error').textContent = message;
    input.parentElement.querySelector('.error').style.display = 'block';
}

const removeError = function (input) {
    input.classList.remove('error-border');
    input.parentElement.querySelector('.error').style.display = 'none';
    input.parentElement.querySelector('.form-label').classList.remove('error-text');

}


let Todaysdate = new Date();
const currentYear = Todaysdate.getFullYear();
console.log(Todaysdate)

document.querySelectorAll('.form-input').forEach(input => {
    input.addEventListener('input', function () {
        // Creating new date instance  
        document.querySelectorAll('.result').forEach(result => {
            result.classList.remove('animation')
        })
        const Todaysdate = new Date();
        const currentYear = Todaysdate.getFullYear();

        // Getting values of input data  
        const inputDay = document.querySelector('#day').value;
        const inputMonth = document.querySelector('#month').value;
        const inputYear = document.querySelector('#year').value;

        // Validate all inputs  
        validateInputs(inputDay, inputMonth, inputYear, currentYear);
    });
});

function validateInputs(day, month, year, currentYear) {
    // Validate Day  
    if (day === '') {
        setError(document.querySelector('#day'));
    } else if (day > 31 || day < 1) {
        setError(document.querySelector('#day'), "Must be a valid day");
    } else if (month !== '' && year !== '') {
        const lastMonthDay = new Date(year, month, 0).getDate();
        if (day > lastMonthDay) {
            setError(document.querySelector('#day'), "Must be a valid date");
        } else {
            removeError(document.querySelector('#day'));
        }
    } else {
        removeError(document.querySelector('#day'));
    }

    // Validate Month  
    if (month === '') {
        setError(document.querySelector('#month'));
    } else if (month > 12 || month < 1) {
        setError(document.querySelector('#month'), "Must be a valid month");
    } else {
        removeError(document.querySelector('#month'));
    }

    // Validate Year  
    if (year === '') {
        setError(document.querySelector('#year'));
    } else if (year > currentYear) {
        setError(document.querySelector('#year'), "Must be in the past");
    } else if (year < 0) {
        setError(document.querySelector('#year'), "Must be a valid year");
    } else {
        removeError(document.querySelector('#year'));
    }
}

document.getElementById('my-form').onsubmit = (event) => {  
    event.preventDefault();  
    
    if (errorNumbers() === 0){

        const inputDay = parseInt(document.querySelector('#day').value, 10);  
        const inputMonth = parseInt(document.querySelector('#month').value, 10) - 1; // Month is 0-indexed  
        const inputYear = parseInt(document.querySelector('#year').value, 10);  
        const dob = new Date(inputYear, inputMonth, inputDay);  
        
        const today = new Date(); // Get today's date  
        const timeDelta = today - dob;   
    
        // Calculate years  
        let years = today.getFullYear() - dob.getFullYear();  
        let months = today.getMonth() - dob.getMonth();  
        let days = today.getDate() - dob.getDate();  
    
        // Adjust if the current month and day are before the birth month and day  
        if (months < 0 || (months === 0 && days < 0)) {  
            years--;  
            months += 12; // Adjust months to get the correct number  
        }  
    
        // Adjust days if necessary  
        if (days < 0) {  
            const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0); // Get last day of the previous month  
            days += lastMonth.getDate(); // Add days from the last month  
            months--; // Decrease month count  
        }  
    
        document.querySelector('.dash-year').textContent = `${years}`;
        document.querySelector('.dash-month').textContent = `${months}`;
        document.querySelector('.dash-day').textContent = `${days}`;
        
        document.querySelectorAll('.result').forEach(result => {
            result.classList.add('animation')
        })
        console.log(errorNumbers())
    }
};

const errorNumbers = () => {
    const errors = Array.from(document.querySelectorAll('.error'));
    const numberOfErrors = errors.filter(error => error.style.display != 'none').length;

    return numberOfErrors
}