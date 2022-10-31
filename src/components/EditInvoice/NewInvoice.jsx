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
import { addInvoice, invoicesIsErrorSelector } from "../../store/slices/invoicesSlice";
import { loadTerms, statusesSelector } from "../../store/slices/termsSlice";
import { useFieldArray, useForm } from "react-hook-form";
import { convertFormDataToSend, convertPaymentTermsToView, getCurrentDate } from "../../utils/validation";

function NewInvoice({ active, setActive }) {

    const isDarkMode = useDarkMode();
    const dispatch = useDispatch();
    const defaultValues = {
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
    };

    const {
        register,
        control,
        getValues,
        handleSubmit,
        formState: { errors },
        setValue,
        reset
    } = useForm({
        defaultValues: defaultValues
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

    useEffect(() => {
        const promiseTerms = dispatch(loadTerms());
        reset(defaultValues);
        return () => {
            promiseTerms.abort();
        }
    }, [dispatch, active]);

    const isError = useSelector(state => invoicesIsErrorSelector(state));
    const dataTerms = useSelector(state => statusesSelector(state));

    if (!dataTerms) {
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

    function getCaption() {
        return (
            <header className={s.number}>
                New Invoice
            </header>
        );
    }

    function getCommandPanel() {
        return (
            <div className={s.commandsNew}>
                <ButtonEdit type="button" onClick={() => setActive(false)}>Discard</ButtonEdit>
                <div className={s.save}>
                    <ButtonSave type="submit">Save as Draft</ButtonSave>
                    <ButtonMark type="submit" onClick={() => setValue("status", "Pending")}>Save & Send</ButtonMark>
                </div>
            </div>
        );
    }

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
                        - Error create invoice - try again later
                    </p>
                </div>
            )
        }

        return null;
    }

    function onSubmit(data) {

        const dataToSend = convertFormDataToSend(data, true);

        dispatch(addInvoice(dataToSend));

        if (!isError) {
            setActive(false);
        } 

    };

    return (
        <div className={getClasses(isDarkMode, active)}>
            <div className={s.editInvoice}>

                {getCaption()}

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
                        <div className={s.city_code_country}>
                            <div className={s.input30}>
                                <InputForm
                                    labelText="City"
                                    id="city"
                                    error={errors.city ? "true" : "false"}
                                    textError={errors?.senderAddress?.message || "Error!"}
                                    register={register("city", { required: "can’t be empty" })}
                                />
                            </div>
                            <div className={s.input30}>
                                <InputForm
                                    labelText="Post Code"
                                    id="post_code"
                                    error={errors.post_code ? "true" : "false"}
                                    textError={errors?.post_code?.message || "Error!"}
                                    register={register("post_code", { required: "can’t be empty" })}
                                />
                            </div>
                            <div className={s.input30}>
                                <InputForm
                                    labelText="Country"
                                    id="country"
                                    error={errors.country ? "true" : "false"}
                                    textError={errors?.country?.message || "Error!"}
                                    register={register("country", { required: "can’t be empty" })}
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

                        <div className={s.city_code_country}>
                            <div className={s.input30}>
                                <InputForm
                                    labelText="City"
                                    id="city_to"
                                    error={errors.city_to ? "true" : "false"}
                                    textError={errors?.city_to?.message || "Error!"}
                                    register={register("city_to", { required: "can’t be empty" })}

                                />
                            </div>
                            <div className={s.input30}>
                                <InputForm
                                    labelText="Post Code"
                                    id="post_code_to"
                                    error={errors.post_code_to ? "true" : "false"}
                                    textError={errors?.post_code_to?.message || "Error!"}
                                    register={register("post_code_to", { required: "can’t be empty" })}
                                />
                            </div>
                            <div className={s.input30}>
                                <InputForm
                                    labelText="Country"
                                    id="country_to"
                                    error={errors.country_to ? "true" : "false"}
                                    textError={errors?.country_to?.message || "Error!"}
                                    register={register("country_to", { required: "can’t be empty" })}
                                />
                            </div>
                        </div>

                        <div className={s.date_payment}>
                            <div className={s.input50}>
                                <DatePicker
                                    labelText="Invoice Date"
                                    id="invoice_date"
                                    error={errors.invoice_date ? "true" : "false"}
                                    register={register("invoice_date", { required: true })}

                                />
                            </div>
                            <div className={s.input50}>
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
                        <div className={s.table}>
                            <ItemList fields={fields} register={register} remove={remove}
                                getValues={getValues} setValue={setValue} errors={errors} />
                        </div>
                        <ButtonNewItem type="button" onClick={() => append({ name: "", quantity: "", price: "", total: "" })}>+ Add New Item</ButtonNewItem>
                        {showErrorTextToList()}
                    </section>
                    {getCommandPanel()}
                </form>

            </div>
        </div>
    )
}

export default NewInvoice;
