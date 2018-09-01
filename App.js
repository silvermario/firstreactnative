import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';

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

export default class App extends Component {

    state = {
        items: new Array(20).fill(0).map((a, i) => i).map(i => ({
            title: `Note number ${i}`,
            content: `Content number ${i}. It's a bit longer than title. It's even long enough to force a line break`,
        })),
    };

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    {this.state.items.map(({title, content}) => (
                        <Note style={styles.item} key={title} title={title} content={content}></Note>
                    ))}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
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
