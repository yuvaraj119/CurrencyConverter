import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StatusBar, KeyboardAvoidingView} from 'react-native';
import {connect} from 'react-redux';
// local imports
import {Container} from '../components/Container';
import {Logo} from '../components/Logo';
import {InputWithButton} from '../components/TextInput';
import {ClearButton} from '../components/Button';
import {LastConverted} from '../components/Text';
import {Header} from '../components/Header';

// actions
import {swapCurrency, changeCurrencyAmount, getInitialConversion} from '../actions/currencies';

class Home extends Component {
    static propTypes = {
        navigation: PropTypes.object,
        dispatch: PropTypes.func,
        baseCurrency: PropTypes.string,
        quoteCurrency: PropTypes.string,
        conversionRate: PropTypes.number,
        isFetching: PropTypes.bool,
        lastConvertedDate: PropTypes.object,
        primaryColor: PropTypes.string,
    };

    componentWillMount(){
        this.props.dispatch(getInitialConversion());
    }

    handlePressBaseCurrency = () => {
        this.props.navigation.navigate('CurrencyList', {title: 'Base Currency', type: 'base'});
    };

    handlePressQuoteCurrency = () => {
        this.props.navigation.navigate('CurrencyList', {title: 'Quote Currency', type: 'quote'});
    };

    handleTextChange = (amount) => {
        this.props.dispatch(changeCurrencyAmount(amount));
    };

    handleSwapCurrency = () => {
        this.props.dispatch(swapCurrency());
    };

    handleOptionPress = () => {
        this.props.navigation.navigate('Options');
    };

    render() {

        let quotePrice = (this.props.amount * this.props.conversionRate).toFixed(2);
        if (this.props.isFetching) {
            quotePrice = '...';
        }


        return (
            <Container backgroundColor={this.props.primaryColor}>
                <StatusBar backgroundColor={this.props.primaryColor} translucent={false} barStyle="light-content"/>
                <Header onPress={this.handleOptionPress}/>
                <KeyboardAvoidingView behavior="padding">
                    <Logo tintColor={this.props.primaryColor}/>
                    <InputWithButton
                        buttonText={this.props.baseCurrency}
                        onPress={this.handlePressBaseCurrency}
                        defaultValue={this.props.amount.toString()}
                        keyboardType="numeric"
                        onChangeText={this.handleTextChange}
                        textColor={this.props.primaryColor}
                    />
                    <InputWithButton
                        buttonText={this.props.quoteCurrency}
                        onPress={this.handlePressQuoteCurrency}
                        editable={false}
                        value={quotePrice}
                        textColor={this.props.primaryColor}
                    />
                    <LastConverted
                        base={this.props.baseCurrency}
                        quote={this.props.quoteCurrency}
                        date={this.props.lastConvertedDate}
                        conversionRate={this.props.conversionRate}
                    />
                    <ClearButton text="Reverse Currencies" onPress={this.handleSwapCurrency}/>
                </KeyboardAvoidingView>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    const baseCurrency = state.currenciesR.baseCurrency;
    const quoteCurrency = state.currenciesR.quoteCurrency;
    const conversionSelector = state.currenciesR.conversions[baseCurrency] || {};
    const rates = conversionSelector.rates || {};
    return {
        baseCurrency,
        quoteCurrency,
        amount: state.currenciesR.amount,
        conversionRate: rates[quoteCurrency] || 0,
        isFetching: conversionSelector.isFetching,
        lastConvertedDate: conversionSelector.date ? new Date(conversionSelector.date) : new Date(),
        primaryColor: state.themeR.primaryColor,
    };
};

export default connect(mapStateToProps)(Home);
