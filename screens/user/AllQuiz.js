import { Text, View, FlatList, StyleSheet } from 'react-native';
import { QuizInfos } from '../../data/dummy-quizInfo';
import QuizInfoCard from '../../components/QuizInfoCard';
import Filter from '../../components/Filter';
import { TheColor } from '../../constant/TheColor';

function AllQuiz({ navigation }) {
  const formattedData = [...QuizInfos];
  if (formattedData.length % 2 !== 0) {
    formattedData.push({ id: 'blank-item', empty: true });
  }

  function renderCategory({ item }) {
    if (item.empty) {
      return <View style={styles.placeholder} />;
    }

    function pressHandler() {
      navigation.navigate('Quiz Info', { quizId: item.id });
    }

    return (
      <QuizInfoCard
        title={item.title}
        imageUrl={item.imageUrl}
        tags={item.tags}
        questionCount={item.questionCount}
        createdBy={item.createdBy}
        onPress={pressHandler}
      />
    );
  }

  function filterPressHandler(input) {
    console.log(input);
  }

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <Filter onPress={filterPressHandler} />
      </View>

      <FlatList
        data={formattedData}
        keyExtractor={(item) => item.id}
        renderItem={renderCategory}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
}

export default AllQuiz;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 6,
    backgroundColor: TheColor.primary400,
  },
  filterContainer: {
    marginBottom: 2,
    height: 38,
    paddingHorizontal: 6,
  },
  row: {
    justifyContent: 'space-between',
  },
  placeholder: {
    flex: 1,
    margin: 6,
    opacity: 0,
  },
});
