import { Text, View, FlatList, StyleSheet } from 'react-native';
import { QuizInfos } from '../../data/dummy-quizInfo';
import QuizInfoCard from '../../components/QuizInfoCard';
import Filter from '../../components/Filter';
import { TheColor } from '../../constant/TheColor';

function AllQuiz({ navigation }) {
  function renderCategory(itemData) {
    function pressHandler() {
      navigation.navigate('Quiz Page', { quizId: itemData.item.id });
    }
    return (
      <QuizInfoCard
        title={itemData.item.title}
        imageUrl={itemData.item.imageUrl}
        tags={itemData.item.tags}
        questionCount={itemData.item.questionCount}
        createdBy={itemData.item.createdBy}
        onPress={pressHandler}
      />
    );
  }

  function filterPressHandler(input) {
    //add filter logic here
    console.log(input);
  }

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <Filter onPress={filterPressHandler} />
      </View>
      <FlatList
        data={QuizInfos}
        keyExtractor={(item) => item.id}
        renderItem={renderCategory}
        numColumns={2}
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
});
