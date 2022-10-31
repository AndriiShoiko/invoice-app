import { Link, useNavigate, Navigate } from "react-router-dom";
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
import { invoicesIsErrorSelector, addInvoice } from "../../store/slices/invoicesSlice";
import { loadTerms, statusesSelector } from "../../store/slices/termsSlice";
import { useFieldArray, useForm } from "react-hook-form";
import { convertFormDataToSend, getEmptyFormData } from "../../utils/validation";

function NewInvoiceMobile() {

    const isDarkMode = useDarkMode();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        register,
        control,
        getValues,
        handleSubmit,
        formState: { errors },
        setValue,
        reset
    } = useForm({
        defaultValues: getEmptyFormData()
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
        reset(getEmptyFormData());
        return () => {
            promiseTerms.abort();
        }
    }, [dispatch]);

    const dataTerms = useSelector(state => statusesSelector(state));
    const isError = useSelector(state => invoicesIsErrorSelector(state));

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

    if (!dataTerms) {
        return null;
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
            <section className={s.commandButtonsNew}>
                <ButtonEdit type="button" onClick={() => Navigate(`/invoices/`)}>Discard</ButtonEdit>
                <ButtonSave type="submit">Save as Draft</ButtonSave>
                <ButtonMark type="submit" onClick={() => setValue("status", "Pending")}>Save & Send</ButtonMark>
            </section>
        );
    }

    const onSubmit = (data) => {
        const dataToSend = convertFormDataToSend(data, true);
        dispatch(addInvoice(dataToSend));

        if (!isError) {
            navigate(`/invoices/`);
        }
    };

    return (
        <div className={!isDarkMode ? s.editInvoiceMobile : s.editInvoiceMobile + " " + s.editInvoiceMobile_dark_mode}>
            <div className={s.wrapper}>
                <Link to={`/invoices`}>
                    <ButtonGoBack />
                </Link>
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
                    {getCommandPanel()}
                </form>
            </div>
        </div>
    )
}

export default NewInvoiceMobile;
