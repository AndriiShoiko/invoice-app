export function checkFormatDate(value) {
    let inputDate = new Date(value);

    return parsePartsOfDate(inputDate);
}

export function getCurrentDate() {
    let currentDate = new Date();

    return parsePartsOfDate(currentDate);
}

function parsePartsOfDate(date) {
    if (date.getDate() < 10) {
        return date.getFullYear() + "-" + Number(date.getMonth() + 1) + "-0" + date.getDate();
    } else {
        return date.getFullYear() + "-" + Number(date.getMonth() + 1) + "-" + date.getDate();
    }
}

function makeNumber() {
    let text = "";
    const possiblePart1 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const possiblePart2 = "0123456789";

    for (var i = 0; i < 2; i++) {
        text += possiblePart1.charAt(Math.floor(Math.random() * possiblePart1.length));
    }

    for (var i = 0; i < 4; i++) {
        text += possiblePart2.charAt(Math.floor(Math.random() * possiblePart2.length));
    }

    return text;
}

export function convertFormDataToSend(formData, newInvoice = false) {

    let paymentDue = new Date(formData.invoice_date);
    paymentDue = new Date(paymentDue.setDate(paymentDue.getDate() + Number(convertPaymentTermsFromView(formData.payment_terms))));

    const paymentDueToStr = paymentDue.getFullYear() + "-" +
        Number(paymentDue.getMonth() + 1) + "-" + paymentDue.getDate();

    let total = 0;
    formData.items.forEach(el => {
        total += el.total;
    });

    const data = {
        id: formData.id,
        number: newInvoice ? makeNumber() : formData.number,
        status: formData.status,
        createdAt: formData.invoice_date,
        paymentDue: paymentDueToStr,
        description: formData.project_description,
        paymentTerms: convertPaymentTermsFromView(formData.payment_terms),
        clientName: formData.client_name,
        clientEmail: formData.client_email,
        senderAddress: {
            street: formData.street_adress,
            city: formData.city,
            postCode: formData.post_code,
            country: formData.country
        },
        clientAddress: {
            street: formData.street_adress_to,
            city: formData.city_to,
            postCode: formData.post_code_to,
            country: formData.country_to
        },
        total,
        items: formData.items
    }

    return data;
}

export function convertPaymentTermsToView(data) {
    if (data < 2) {
        return `Net ${data} Day`;
    } else {
        return `Net ${data} Days`;
    }
}

function convertPaymentTermsFromView(data) {

    if (data === "") {
        return 0;
    }

    return Number(data.replace(/[^\d;]/g, ''));
}

export function getEmptyFormData() {
    return {
        items: [{ name: "", quantity: "", price: "", total: "" }],
        street_adress: "",
        city: "",
        post_code: "",
        country: "",
        client_name: "",
        client_email: "",
        street_adress_to: "",
        city_to: "",
        post_code_to: "",
        country_to: "",
        invoice_date: getCurrentDate(),
        payment_terms: convertPaymentTermsToView("7"),
        project_description: "",
        status: "Draft",
        id: ""
    }
}