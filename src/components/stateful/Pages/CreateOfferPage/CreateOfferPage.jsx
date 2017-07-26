import React, {Component} from "react";
import classNames from "classnames";
import styles from "./CreateOfferPage.scss";
import NavigationBar from "../../../stateless/NavigationBar/NavigationBar.jsx";
import {Link} from "react-router-dom";
import Button from "../../../stateless/Button/Button.jsx";
import TextField from "../../../stateless/TextField/TextField.jsx";
import SelectorField from "../../../stateless/SelectorField/SelectorField.jsx";
import InputField from "../../../stateless/InputField/InputField.jsx";
import AttributeValueFieldContainer from "../../../stateless/AttributeValueFieldContainer/AttributeValueFieldContainer.jsx";
import AttributeValueField from "../../../stateless/AttributeValueField/AttributeValueField.jsx";
import Label from "../../../stateless/Label/Label.jsx";

const parameters = [
    {field: 'Origin', value: 'Norway'},
    {field: 'Seller', value: 'Johnston Ltd.'},
    {field: 'Anti-Biotics Free', value: 'Yes'},
    {field: 'Method of Fishing', value: 'Line'},
    {field: 'Fresh/ Frozen', value: 'Fresh'},
    {field: 'Fresh/ Frozen', value: 'Fresh'},
    {field: 'Wild/ Aquaculture', value: 'Wild'},
    {field: 'Temperature', value: '0-4 Celsius'}
];

class CreateOfferPage extends Component {

    constructor(props){
        super(props);
        this.formFields = {};
    }

    getOfferData() {
        let result = {};
        for (let i in this.formFields){
            result[i] = this.formFields[i].value;
        }
        return result;
    }

    render() {
        return (<div>
                <NavigationBar title="Create new offer">
                    <Button className={styles.cancelButton}>Cancel</Button>
                    <Button className={styles.saveButton}
                        onClick={(e)=>{
                            this.props.onAdd(
                                this.getOfferData(),
                                this.props.address)
                        }}>Save</Button>
                </NavigationBar>
                <div className={styles.top}>
                    <Label className={styles.label} text="Name of object:"/>
                    <TextField className={classNames(styles.name, styles.element)}
                        inputRef={el => this.formFields.name = el}/>
                    <div className={styles.container}>
                        <div className={styles.column}>
                            <div className={styles.imageContainer}>
                                <div className={styles.verticalContainer}>
                                    <div className={styles.horizontalContainer}>
                                        <img className={styles.image}
                                             src="./static/images/icon-image.png"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.column}>
                            <Label className={styles.label} text="Category:"/>
                            <SelectorField className={styles.selector}
                                           options={[{value: 'Catfish'}, {value: 'Pineapplefish'}]} label="Category"/>
                            <div className={styles.table}>
                                <InputField label="Package weight (kg)" inputRef={el => this.formFields.packageWeight = el}/>
                                <InputField label="Price per package (€)" inputRef={el => this.formFields.pricePerUnit = el}/>
                            </div>
                            <Label className={styles.label} text="Quality standard:"/>
                            <SelectorField className={styles.selector} options={[
                                {value: 'Low'},
                                {value: 'Medium'},
                                {value: 'Good'},
                                {value: 'Excellent'}]} label="Category"/>
                            <span className={styles.paragraph }>or <a href="/#/">create custom requirements</a> for quality</span>
                            <AttributeValueFieldContainer className={styles.properties}>
                                { parameters.map((element, index) => (
                                    <AttributeValueField key={index} field={element.field} value={element.value}/>)
                                ) }
                            </AttributeValueFieldContainer>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateOfferPage;

