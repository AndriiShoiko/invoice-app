export function checkFormatDate(value) {
    let inputDate = new Date(value);

    if (inputDate.getDate() < 10) {
        return inputDate.getFullYear() + "-" + Number(inputDate.getMonth() + 1) + "-0" + inputDate.getDate();
    } else {
        return inputDate.getFullYear() + "-" + Number(inputDate.getMonth() + 1) + "-" + inputDate.getDate();
    }
}

export function convertFormDataToSend(formData ) {

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
    if(data < 2) {
        return `Net ${data} Day`;
    } else {
        return `Net ${data} Days`;
    }
}

function convertPaymentTermsFromView(data) {

    if(data === "") {
        return 0;
    }

    return Number(data.replace(/[^\d;]/g, ''));
}