import s from "./EditInvoice.module.scss";
import ButtonEdit from "../../UI/Buttons/ButtonEdit/ButtonEdit";
import ButtonMark from "../../UI/Buttons/ButtonMark/ButtonMark";
import InputForm from "../../UI/Inputs/InputForm/InputForm";
import DatePicker from "../../UI/Inputs/DatePicker/DatePicker";
import Select from "../../UI/Selects/Select/Select";
import ItemList from "../ItemList/ItemList";
import ButtonNewItem from "../../UI/Buttons/ButtonNewItem/ButtonNewItem";
import ButtonSave from "../../UI/Buttons/ButtonSave/ButtonSave";
import { useDarkMode } from "../../hooks/useDarkMode";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { invoicesSelectorById, loadInvoiceById } from "../../store/slices/invoicesSlice";
import {loadTerms, statusesSelector} from "../../store/slices/termsSlice";
import { useForm } from "react-hook-form";

function EditInvoice({ active, setActive, newInvoice, id }) {

    const isDarkMode = useDarkMode();

    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm();

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

    if (!dataInvoice || !dataTerms) {
        return null;
    }

    function getClasses(isDarkMode, active) {
        if (isDarkMode) {
            if (active) {
                return s.wrapper + " " + s.wrapper_dark_mode + " " + s.active;
            } else {
                return s.wrapper + " " + s.wrapper_dark_mode;
            }
        } else {
            return active ? s.wrapper + " " + s.active : s.wrapper;
        }
    }

    function getCaption(newInvoice, id) {
        if (newInvoice) {
            return (
                <header className={s.number}>
                    New Invoice
                </header>
            );
        } else {
            return (
                <header className={s.number}>
                    Edit <span className={s.prefix}>#</span>{id}
                </header>
            );
        }
    }

    function getCommandPanel(newInvoice) {
        if (newInvoice) {
            return (
                <div className={s.commandsNew}>
                    <ButtonEdit onClick={() => setActive(false)}>Discard</ButtonEdit>
                    <div className={s.save}>
                        <ButtonSave>Save as Draft</ButtonSave>
                        <ButtonMark onClick={() => setActive(false)}>Save & Send</ButtonMark>
                    </div>
                </div>
            );
        } else {
            return (
                <div className={s.commands}>
                    <ButtonEdit type="button" onClick={() => setActive(false)}>Cancel</ButtonEdit>
                    <ButtonMark type="submit">Save Changes</ButtonMark>
                </div>
            );
        }
    }

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <div className={getClasses(isDarkMode, active)}>
            <div className={s.editInvoice}>

                {getCaption(newInvoice, id)}

                <form className={s.form} onSubmit={handleSubmit(onSubmit)}>

                    <div className={s.caption}>Bill From</div>
                    <section className={s.bill_from}>
                        <div className={s.wrapper_input}>
                            <InputForm
                                labelText="Street Address"
                                id="street_adress"
                                error={errors.street_adress ? "true" : "false"}
                                defaultValue={dataInvoice.senderAddress.street}
                                register={register("street_adress", { required: true, minLength: 1 })}
                            />
                        </div>
                        <div className={s.city_code_country}>
                            <div className={s.input30}>
                                <InputForm
                                    labelText="City"
                                    id="city"
                                    error={errors.city ? "true" : "false"}
                                    defaultValue={dataInvoice.senderAddress.city}
                                    register={register("city", { required: true, minLength: 1 })}
                                />
                            </div>
                            <div className={s.input30}>
                                <InputForm
                                    labelText="Post Code"
                                    id="post_code"
                                    error={errors.post_code ? "true" : "false"}
                                    defaultValue={dataInvoice.senderAddress.postCode}
                                    register={register("post_code", { required: true, minLength: 1 })}
                                />
                            </div>
                            <div className={s.input30}>
                                <InputForm
                                    labelText="Country"
                                    id="country"
                                    error={errors.country ? "true" : "false"}
                                    defaultValue={dataInvoice.senderAddress.country}
                                    register={register("country", { required: true, minLength: 1 })}
                                />
                            </div>
                        </div>
                    </section>

                    <div className={s.caption}>Bill To</div>
                    <section className={s.bill_to}>
                        <div className={s.wrapper_input}>
                            <InputForm
                                labelText="Client’s Name"
                                id="client_name"
                                error={errors.client_name ? "true" : "false"}
                                defaultValue={dataInvoice.clientName}
                                register={register("client_name", { required: true, minLength: 1 })}
                            />
                        </div>
                        <div className={s.wrapper_input}>
                            <InputForm
                                labelText="Client’s Email"
                                id="client_email"
                                error={errors.client_email ? "true" : "false"}
                                defaultValue={dataInvoice.clientEmail}
                                register={register("client_email", { required: true, minLength: 1 })}
                            />
                        </div>
                        <div className={s.wrapper_input}>
                            <InputForm
                                labelText="Street Address"
                                id="street_adress_to"
                                error={errors.street_adress_to ? "true" : "false"}
                                defaultValue={dataInvoice.clientAddress.street}
                                register={register("street_adress_to", { required: true, minLength: 1 })}

                            />
                        </div>

                        <div className={s.city_code_country}>
                            <div className={s.input30}>
                                <InputForm
                                    labelText="City"
                                    id="city_to"
                                    error={errors.city_to ? "true" : "false"}
                                    defaultValue={dataInvoice.clientAddress.city}
                                    register={register("city_to", { required: true, minLength: 1 })}

                                />
                            </div>
                            <div className={s.input30}>
                                <InputForm
                                    labelText="Post Code"
                                    id="post_code_to"
                                    error={errors.post_code_to ? "true" : "false"}
                                    defaultValue={dataInvoice.clientAddress.postCode}
                                    register={register("post_code_to", { required: true, minLength: 1 })}
                                />
                            </div>
                            <div className={s.input30}>
                                <InputForm
                                    labelText="Country"
                                    id="country_to"
                                    error={errors.country_to ? "true" : "false"}
                                    defaultValue={dataInvoice.clientAddress.country}
                                    register={register("country_to", { required: true, minLength: 1 })}
                                />
                            </div>
                        </div>

                        <div className={s.date_payment}>
                            <div className={s.input50}>
                                <DatePicker
                                    labelText="Invoice Date"
                                    id="invoice_date"
                                    error={errors.invoice_date ? "true" : "false"}
                                    defaultValue={dataInvoice.createdAt}
                                    register={register("invoice_date", { required: true })}

                                />
                            </div>
                            <div className={s.input50}>
                                <Select
                                    readOnly={true}
                                    labelText="Payment Terms"
                                    id="payment_terms"
                                    error={errors.payment_terms ? "true" : "false"}
                                    defaultValue={dataInvoice.paymentTerms}
                                    arrValues={dataTerms.entities}
                                    register={register("payment_terms", { required: true })}
                                    handlerSetValue={setValue}
                                />
                            </div>
                        </div>

                        <div className={s.wrapper_input}>
                            <InputForm
                                labelText="Project Description"
                                id="project_description"
                                error={errors.project_description ? "true" : "false"}
                                defaultValue={dataInvoice.description}
                                register={register("project_description", { required: true, minLength: 1 })}
                            />
                        </div>
                    </section>
                    <section className={s.itemList}>
                        <div className={s.captionItemList}>Item List</div>
                        <div className={s.table}>
                            <ItemList />
                        </div>
                        <ButtonNewItem>+ Add New Item</ButtonNewItem>
                    </section>
                    {getCommandPanel(newInvoice)}
                </form>

            </div>
        </div>
    )
}

export default EditInvoice;
