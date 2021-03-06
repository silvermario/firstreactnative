import React, {Component, PureComponent} from 'react';
import {StyleSheet, Text, View, ScrollView, TextInput, AsyncStorage} from 'react-native';

class Note extends Component {
    render() {
        return (
            <View>
                <Text style={styles.item}>
                    <Text style={styles.title}>{this.props.title}</Text>
                    <Text style={styles.content}>{this.props.content}</Text>
                </Text>
            </View>
        );
    }
}


const textKey = 'devmeeting:text';

export default class App extends PureComponent {

    state = {
        value: '',
        items: new Array(3).fill(0).map((a, i) => i).map(i => ({
            title: `Note number ${i}`,
            content: `Content number ${i}. It's a bit longer than title. It's even long enough to force a line break`,
        })),
    };

    componentWillMount() {
        AsyncStorage.getItem(textKey).then(text => {
            this.setState( state => ({items: JSON.parse(text)}));
        });
      }



    render() {
        return (
            <View style={styles.container}>
                <View style={styles.form}>
                    <TextInput
                        placeholder="Enter text"
                        returnKeyType="done"
                        value={this.state.value}
                        onChangeText={(value) => this.setState({value})}
                        onSubmitEditing={this.submit}
                    />
                </View>
                <ScrollView>
                    {this.state.items.map(({title, content}) => (
                        <Note key={title} title={title} content={content}></Note>
                    ))}
                </ScrollView>
            </View>
        );
    }

    submit = () => {
        this.setState(state => ({
            items: state.items.concat({
                title: new Date().toGMTString(),
                content: state.value,
            }),
            value: '',
        }));

        console.log(this.state.items);
        AsyncStorage.setItem(textKey, JSON.stringify(this.state.items));

    }
}

const styles = StyleSheet.create({
    form: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
        paddingTop: 20,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        paddingTop: 20,
    },
    item: {
        margin: 24,
        textAlign: 'left',
        color: '#34495e',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    title: {
        fontWeight: 'bold',
        marginVertical: 50,
        height: 50,
    },
    content: {
        height: 200,
        marginVertical: 50,
    },
});
