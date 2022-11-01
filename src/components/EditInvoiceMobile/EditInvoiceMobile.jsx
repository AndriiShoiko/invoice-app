import { Link, useParams, useNavigate  } from "react-router-dom";
import ButtonGoBack from "../../UI/Buttons/ButtonGoBack/ButtonGoBack";
import ButtonNewItem from "../../UI/Buttons/ButtonNewItem/ButtonNewItem";
import DatePicker from "../../UI/Inputs/DatePicker/DatePicker";
import InputForm from "../../UI/Inputs/InputForm/InputForm";
import Select from "../../UI/Selects/Select/Select";
import ItemListMobile from "../ItemListMobile/ItemListMobile";
import ButtonMark from "../../UI/Buttons/ButtonMark/ButtonMark";
import ButtonEdit from "../../UI/Buttons/ButtonEdit/ButtonEdit";
import ButtonSave from "../../UI/Buttons/ButtonSave/ButtonSave";
import s from "./EditInvoiceMobile.module.scss";
import { useDarkMode } from "../../hooks/useDarkMode";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { invoicesSelectorById, loadInvoiceById, invoicesIsErrorSelector, updateInvoiceById } from "../../store/slices/invoicesSlice";
import { loadTerms, statusesSelector } from "../../store/slices/termsSlice";
import { useFieldArray, useForm } from "react-hook-form";
import { checkFormatDate, convertFormDataToSend, convertPaymentTermsToView } from "../../utils/validation";

function EditInvoiceMobile({ newInvoice }) {

    const isDarkMode = useDarkMode();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        const promiseInvoice = dispatch(loadInvoiceById(id));
        const promiseTerms = dispatch(loadTerms());
        return () => {
            promiseInvoice.abort();
            promiseTerms.abort();
        }
    }, [dispatch, id]);

    const dataInvoice = useSelector(state => invoicesSelectorById(state, id));
    const dataTerms = useSelector(state => statusesSelector(state));
    const isError = useSelector(state => invoicesIsErrorSelector(state));

    const {
        register,
        control,
        getValues,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm({
        defaultValues: {
            items: dataInvoice.items,
            street_adress: dataInvoice.senderAddress.street,
            city: dataInvoice.senderAddress.city,
            post_code: dataInvoice.senderAddress.postCode,
            country: dataInvoice.senderAddress.country,
            client_name: dataInvoice.clientName,
            client_email: dataInvoice.clientEmail,
            street_adress_to: dataInvoice.clientAddress.street,
            city_to: dataInvoice.clientAddress.city,
            post_code_to: dataInvoice.clientAddress.postCode,
            country_to: dataInvoice.clientAddress.country,
            invoice_date: checkFormatDate(dataInvoice.createdAt),
            payment_terms: convertPaymentTermsToView(dataInvoice.paymentTerms),
            project_description: dataInvoice.description,
            status: dataInvoice.status,
            number: dataInvoice.number,
            id: id

        }
    });

    const {
        fields,
        append,
        remove
    } = useFieldArray({
        control,
        name: "items",
        rules: {
            required: true
        }
    });

    function showErrorTextToList() {
        if (errors?.items) {
            return (
                <div className={s.showErrorList}>
                    <p className={s.textError}>
                        - All fields must be added
                    </p>
                </div>
            )
        } else if (isError) {
            return (
                <div className={s.showErrorList}>
                    <p className={s.textError}>
                        - Error updating data - try again later
                    </p>
                </div>
            )
        }

        return null;
    }

    if (!dataInvoice || !dataTerms) {
        return null;
    }

    function getCaption(newInvoice) {
        if (newInvoice) {
            return (
                <header className={s.number}>
                    New Invoice
                </header>
            );
        } else {
            return (
                <header className={s.number}>
                    Edit <span className={s.prefix}>#</span>XM9141
                </header>
            );
        }
    }

    function getCommandPanel(newInvoice) {
        if (newInvoice) {
            return (
                <section className={s.commandButtonsNew}>
                    <ButtonEdit>Discard</ButtonEdit>
                    <ButtonSave>Save as Draft</ButtonSave>
                    <ButtonMark>Save & Send</ButtonMark>
                </section>
            );
        } else {
            return (
                <section className={s.commandButtons}>
                    <Link to={`/invoice-app/${id}`}>
                        <ButtonEdit type="button">Cancel</ButtonEdit>
                    </Link>
                    <ButtonMark type="submit">Save Changes</ButtonMark>
                </section>
            );
        }
    }

    const onSubmit = (data) => {
        const dataToSend = convertFormDataToSend(data);
        const props = { id, data: dataToSend };
        dispatch(updateInvoiceById(props));
        if(!isError) {
            navigate(`/invoice-app/${id}`);
        }
    };

    return (
        <div className={!isDarkMode ? s.editInvoiceMobile : s.editInvoiceMobile + " " + s.editInvoiceMobile_dark_mode}>
            <div className={s.wrapper}>
                <Link to={`/invoice-app/${id}`}>
                    <ButtonGoBack />
                </Link>
                {getCaption(newInvoice)}

                <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
                    <div className={s.caption}>Bill From</div>
                    <section className={s.bill_from}>
                        <div className={s.wrapper_input}>
                            <InputForm
                                labelText="Street Address"
                                id="street_adress"
                                error={errors.street_adress ? "true" : "false"}
                                textError={errors?.street_adress?.message || "Error!"}
                                register={register("street_adress", { required: "can’t be empty" })}
                            />
                        </div>
                        <div className={s.city_code}>
                            <div className={s.input50}>
                                <InputForm
                                    labelText="City"
                                    id="city"
                                    error={errors.city ? "true" : "false"}
                                    textError={errors?.senderAddress?.message || "Error!"}
                                    register={register("city", { required: "can’t be empty" })}
                                />
                            </div>
                            <div className={s.input50}>
                                <InputForm
                                    labelText="Post Code"
                                    id="post_code"
                                    error={errors.post_code ? "true" : "false"}
                                    textError={errors?.post_code?.message || "Error!"}
                                    register={register("post_code", { required: "can’t be empty" })}
                                />
                            </div>
                        </div>
                        <div className={s.wrapper_input}>
                            <InputForm
                                labelText="Country"
                                id="country"
                                error={errors.country ? "true" : "false"}
                                textError={errors?.country?.message || "Error!"}
                                register={register("country", { required: "can’t be empty" })}
                            />
                        </div>
                    </section>
                    <div className={s.caption}>Bill To</div>
                    <section className={s.bill_to}>
                        <div className={s.wrapper_input}>
                            <InputForm
                                labelText="Client’s Name"
                                id="client_name"
                                error={errors.client_name ? "true" : "false"}
                                textError={errors?.client_name?.message || "Error!"}
                                register={register("client_name", { required: "can’t be empty" })}
                            />
                        </div>
                        <div className={s.wrapper_input}>
                            <InputForm
                                labelText="Client’s Email"
                                id="client_email"
                                error={errors.client_email ? "true" : "false"}
                                textError={errors?.client_email?.message || "Error!"}
                                register={register("client_email", {
                                    required: "can’t be empty",
                                    pattern: {
                                        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                                        message: "not correct e-mail"
                                    }
                                })}
                            />
                        </div>
                        <div className={s.wrapper_input}>
                            <InputForm
                                labelText="Street Address"
                                id="street_adress_to"
                                error={errors.street_adress_to ? "true" : "false"}
                                textError={errors?.street_adress_to?.message || "Error!"}
                                register={register("street_adress_to", { required: "can’t be empty" })}

                            />
                        </div>
                        <div className={s.city_code}>
                            <div className={s.input50}>
                                <InputForm
                                    labelText="City"
                                    id="city_to"
                                    error={errors.city_to ? "true" : "false"}
                                    textError={errors?.city_to?.message || "Error!"}
                                    register={register("city_to", { required: "can’t be empty" })}

                                />
                            </div>
                            <div className={s.input50}>
                                <InputForm
                                    labelText="Post Code"
                                    id="post_code_to"
                                    error={errors.post_code_to ? "true" : "false"}
                                    textError={errors?.post_code_to?.message || "Error!"}
                                    register={register("post_code_to", { required: "can’t be empty" })}
                                />
                            </div>
                        </div>
                        <div className={s.wrapper_input}>
                            <InputForm
                                labelText="Country"
                                id="country_to"
                                error={errors.country_to ? "true" : "false"}
                                textError={errors?.country_to?.message || "Error!"}
                                register={register("country_to", { required: "can’t be empty" })}
                            />
                        </div>
                        <div className={s.wrapper_input}>
                            <DatePicker
                                labelText="Invoice Date"
                                id="invoice_date"
                                error={errors.invoice_date ? "true" : "false"}
                                register={register("invoice_date", { required: true })}

                            />
                        </div>
                        <div className={s.wrapper_input}>
                            <Select
                                readOnly={true}
                                labelText="Payment Terms"
                                id="payment_terms"
                                error={errors.payment_terms ? "true" : "false"}
                                arrValues={dataTerms.entities}
                                register={register("payment_terms", { required: true })}
                                handlerSetValue={setValue}
                            />
                        </div>
                        <div className={s.wrapper_input}>
                            <InputForm
                                labelText="Project Description"
                                id="project_description"
                                error={errors.project_description ? "true" : "false"}
                                textError={errors?.project_description?.message || "Error!"}
                                register={register("project_description", { required: "can’t be empty" })}
                            />
                        </div>
                    </section>
                    <section className={s.itemList}>
                        <div className={s.captionItemList}>Item List</div>
                        <ItemListMobile fields={fields} register={register} remove={remove}
                            getValues={getValues} setValue={setValue} errors={errors} />
                        <ButtonNewItem type="button" onClick={() => append({ name: "", quantity: "", price: "", total: "" })}>+ Add New Item</ButtonNewItem>
                        <div className={s.shadowBlock}>
                            {showErrorTextToList()}
                        </div>
                    </section>
                    {getCommandPanel(newInvoice)}
                </form>
            </div>
        </div>
    )
}

export default EditInvoiceMobile;
