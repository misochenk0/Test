import { closeModal } from "./popup";

const formData = () => {

    const form = document.querySelectorAll('form'),
          inputs = document.querySelectorAll('input');
    
    //for each form on submit data goes to server and modal closes
    form.forEach(item => {
        item.addEventListener('submit', (e)=> {
            e.preventDefault();
            postData(item);  
            closeModal(item);
        });
    }); 

    // clear inputs after posting data except buttons 
    function clearInputs(inputs) {
        const textArea = document.querySelectorAll('textarea').forEach(i => i.value = '');
        inputs.forEach(input => {
            if (input.classList.contains('button')) {

            } else if(input.checked === true) {
                input.checked = false;
            } else {
                input.value = '';
            }
        });
    }

    // create object with data / fetch data to server /show data in console or show an error  and clear inputs after all
    function postData(form) {
        const formData = new FormData(form);

        const object = {};
        formData.forEach((value, key) => {
            object[key] = value;
        })
        const json = JSON.stringify(object);

        fetch('server.php', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: json

        }).then(data => data.text())
        .then(data => {
            console.log(data);
        }).catch(() =>{
            console.log('Error');
        })
        .finally(() => {
            clearInputs(inputs);
        })
    }

}
export default formData; 