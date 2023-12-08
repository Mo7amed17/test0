import { toast , Flip } from 'react-toastify';
import { useEffect } from 'react';

export const Notification=( message, time=1500 , type, onClose )=>{
    return toast(message, {
        position: "top-right",
        autoClose: time,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        closeButton :false,
        type:`${type}`,
        rtl:true,
        transition: Flip,
        toastId: Math.random(10),
        onClose: onClose
        })
} 

export const ToFormData=(values)=>{
    const formData = new FormData();
    Object?.keys(values)?.forEach((key)=>{
        if (Array.isArray(values[key])){
            values[key].map((ele,index)=>{
                formData.append(`${key}[${index}]`,ele)
            })
        }
        else {
            formData.append(key, values[key]);  
        } 
    })
    return formData;
}

export const CheckActiveNavbarLink=(ele)=>{
    useEffect(() => {
        const Links=document.querySelectorAll(".NavbarLink")
        Links.forEach((link)=>link.classList.remove("ActiveNavbarLink"))
        switch (ele) {
            case 1:
            return (Links[0].classList.add("ActiveNavbarLink"))
            case 2:
            return (Links[1].classList.add("ActiveNavbarLink"))
            default:
            return
        }
    }, [ele]);
}

export const GetChangedData= (obj1 , obj2 )=>{
    const keys = Object.keys(obj1);
    const changes = {};
        for (const key of keys) {
        if (obj1[key] !== obj2[key]) {
            changes[key] = {
            oldValue: obj1[key],
            newValue: obj2[key]
            };
        }
        }
    return Object.keys(changes).length > 0 ? changes : undefined;
}


export const checkFormValidation =(formikProps)=>{
    if(Object.keys(formikProps?.values)?.length === 0){
        Notification("يرجى ملئ الحقول المطلوبة",2000,"error")
    }else if(Object.keys(formikProps?.errors)?.length > 0){
        Notification("يرجى ملئ الحقول المطلوبة",2000,"error")
    }
    else return
}


export const BlockButton=()=>{
    let Button = document.querySelector('button[type="submit"]')
    Button.disabled=true
    Button.style.backgroundColor="rgba(8, 170, 8, 0.44)"
    Button.style.borderColor="rgba(8, 170, 8, 0.44)"
    Button.style.cursor="not-allowed"
}
export const OpenButton=()=>{
    let Button = document.querySelector('button[type="submit"]')
    Button.disabled=false
    Button.disabled=false
    Button.style.backgroundColor="rgb(8, 170, 8)"
    Button.style.borderColor="rgb(8, 170, 8)"
    Button.style.cursor="pointer"
}

export const SetActiveElement=( selector , className )=>{
    const elements=document.querySelectorAll(`${selector}`)
    elements.forEach((element)=>{
        element.addEventListener("click",(e)=>{
            elements.forEach((ele)=>ele.classList.remove(`${className}`))
            e.target.classList.add(`${className}`)
        })
    })
}

export const changedValues=( newValues , oldValues)=>{
    const diff = {};
    for (const key in newValues) {
    if (newValues.hasOwnProperty(key)) {
        if (oldValues.hasOwnProperty(key) && newValues[key] !== oldValues[key]) {
            diff[key] = oldValues[key];
        }
        }
    }

    return diff;
}