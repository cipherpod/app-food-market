import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './CreateOfferPage.scss';
import NavigationBar from '../../navigation/NavigationBar/NavigationBar';
import { Link } from 'react-router-dom';
import TextField from '../../../generic/TextField/TextField';
import SelectorField from '../../../generic/SelectorField/SelectorField';
import InputField from '../../../generic/InputField/InputField';
import AttributeValueFieldContainer from '../../containers/AttributeValueFieldContainer/AttributeValueFieldContainer';
import FileProcessor from 'react-file-processor';
import Label from '../../../generic/Label/Label.jsx';
import Button from '../../../generic/Button/Button.jsx';
import { fetchAttributes } from '../../../../../redux/actions/AttributesAction';

const PRICE_DECIMALS = 2;
const WEIGHT_DECIMALS = 2;

class CreateOfferPage extends Component {

  static propTypes = {
    categories: PropTypes.arrayOf(PropTypes.string),
    qualities: PropTypes.arrayOf(PropTypes.string),
  };

  static defaultProps = {
    categories: ['None'],
    qualities: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      form: {
        name: '',
        category: '',
        packageWeight: '',
        pricePerPackage: '',
        quality: '',
      },
    };
  }

  onImageClick(e) {
    this.refs.myFileInput.chooseFile();
  }

  onFileSelect(e, files) {
    if (!files[0]) return;
    this.image = files[0];
    let reader = new FileReader();
    reader.onload = (event) => {
      this.refs.image.src = event.target.result;
    };

    reader.readAsDataURL(files[0]);
  }

  onSaveClick() {
    let offer = this.state.form;
    offer.pricePerUnit *= 10 ** PRICE_DECIMALS;
    offer.packageWeight *= 10 ** WEIGHT_DECIMALS;
    this.props.onAdd(offer, this.image, this.props.address);
  };

  getCategories() {
    return this.props.categories.map((key) => ({ value: key }));
  }

  getQualities() {
    const qualities = this.props.qualities.length > 0 ? this.props.qualities : CreateOfferPage.defaultProps.qualities;
    return qualities.map((key) => ({ value: key }));
  }

  onChange(label, state) {
    let formState = Object.assign(this.state.form,
      {
        [label]: state.value,
      });
    formState.pricePerUnit = this.state.form.pricePerPackage / this.state.form.packageWeight;

    this.setState({
      form: formState,
    });
  }

  getAttributes(quality) {
    this.props.fetchAttributes(quality, this.props.address);
  }

  render() {
    return (<div>
        <NavigationBar title='Create an offer'>
          <Button className={styles.cancelButton}
                  onClick={this.props.history.goBack}>Cancel</Button>
          <Button className={styles.saveButton}
                  onClick={() => this.onSaveClick()}>Save</Button>
        </NavigationBar>
        <div className={styles.top}>
          <Label className={styles.label} text='Name of object:'/>
          <TextField label="name" onChange={this.onChange.bind(this)} className={styles.textField}/>
          <div className={styles.container}>
            <div className={styles.column}>
              <FileProcessor
                ref='myFileInput'
                onFileSelect={(e, f) => this.onFileSelect(e, f)}>
                <div className={styles.imageContainer} onClick={() => this.onImageClick()}>
                  <div className={styles.verticalContainer}>
                    <div className={styles.horizontalContainer}>
                      <img className={styles.image}
                           src='./static/images/iconImage.png'
                           ref='image'/>
                    </div>
                  </div>
                </div>
              </FileProcessor>
            </div>
            <div className={styles.column}>
              <Label className={styles.label} text='Category:'/>
              <SelectorField className={styles.selector}
                             onChange={this.onChange.bind(this)}
                             options={this.getCategories()} label='category'/>
              <div className={styles.table}>
                <InputField text='Package weight (kg)' onChange={this.onChange.bind(this)} label='packageWeight'/>
                <InputField text='Price per package (€)' onChange={this.onChange.bind(this)} label='pricePerPackage'/>
              </div>
              <Label className={styles.label} text='Quality standard:'/>
              <SelectorField className={styles.selector}
                             onChange={(label, state) => {
                                this.onChange(label, state);
                                this.getAttributes(state.value);
                              }}

                             options={this.getQualities()}
                             label='quality'/>
              <span className={styles.paragraph}>or
                <Link className={styles.link} to='create-requirements'>create custom requirements</Link>
                for quality</span>
              <AttributeValueFieldContainer options={this.props.attributesValueField} className={styles.properties}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateOfferPage;
