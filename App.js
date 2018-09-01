import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';

export default class App extends React.Component {

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
                        <Text key={title} style={styles.paragraph}>
                            <Text style={styles.title}>{title}</Text>
                            <Text>{content}</Text>
                        </Text>
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
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        textAlign: 'left',
        color: '#34495e',
    },
    item: {
        paddingHorizontal: 10,
    },
    title: {
        fontWeight: 'bold',
        marginVertical: 5,
    },
});
