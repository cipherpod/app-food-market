import React, {Component} from "react";
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import cx from "classnames";
import styles from "./ConfirmBuyModal.scss";
import Label from "../../generic/Label/Label";
import Button from "../../generic/Button/Button";
import AttributeValueFieldContainer from "../AttributeValueFieldContainer/AttributeValueFieldContainer";
import {showModal, hideModal} from '../../../../redux/actions/ModalAction';

const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onConfirm: () => console.log("not yet implemented"),
        onCancel: () => dispatch(hideModal())
    }
};

class ConfirmBuyModal extends Component {

    static defaultProps = {
        visible: false,
        onCancel: () => {
            console.info('onCancel not defined in ', ConfirmBuyModal)
        },
        onConfirm: () => {
            console.info('onConfirm not defined in ', ConfirmBuyModal)
        }
    };

    static propTypes = {
        onCancel: PropTypes.func,
        onConfirm: PropTypes.func,
    };

    render() {
        return (<div>
            <div className={cx(styles.modal, this.props.className)}>
                <div className={styles.inner}>
                    <div className={styles.upper}>
                        <Label className={styles.title} text="Confirm buy"/>
                        <div className={styles.description}>We put 140 EUR tokens into ESCROW</div>
                        <div className={styles.table}>
                            <AttributeValueFieldContainer
                                options={[
                                    {field: 'Price', value: '35 euro / kg'},
                                    {field: 'Price per package', value: '140 euro'},
                                    {field: 'Per package', value: '4 kg'},
                                ]}/>
                            <AttributeValueFieldContainer
                                options={[
                                    {field: 'TOTAL WEIGHT', value: '4 kg'},
                                    {field: 'TOTAL PRICE', value: '140 euro'},
                                ]}/>
                        </div>
                    </div>
                    <div className={styles.lower}>
                        <div><input id="checkBox" type="checkbox"/> I want to insure my delivery for 2% of value of
                            delivery
                        </div>
                        <div className={styles.buttons}>
                            <Button onClick={this.props.onCancel} className={styles.cancel}>Cancel</Button>
                            <Button onClick={this.props.onConfirm} className={styles.confirm}>Confirm my order</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmBuyModal);
