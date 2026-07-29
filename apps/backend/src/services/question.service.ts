import prisma from '../config/prisma.js';
import { GameMode } from '../../generated/prisma/enums.js';
import { ensureFilePosterImage } from './image.service.js';

interface QuestionContent {
  options?: string[];
  imageUrl?: string;
  correctAnswer?: string;
}

// export async function getQuestion(mode: GameMode, level: number) {
//   const questions = await prisma.question.findMany({
//     where: {
//       mode,
//       levelNumber: level,
//     },
//   });

//   if (mode === GameMode.BLURRED_POSTER) {
//     const question = questions[0];

//     if (!question) return questions;
//     const content = question.content as QuestionContent;
//     const correctAnswer = content?.correctAnswer;
//     const imageUrl = content?.imageUrl;
//     console.log('imageUrl backend service:', imageUrl);

//     console.log('question data:', question);

//     if (correctAnswer && !imageUrl) {
//       const imageUrl = await ensureFilePosterImage(
//         correctAnswer,
//         'file-poster',
//       );
//       const questions = await prisma.question.update({
//         where: {
//           id: question.id,
//         },
//         data: {
//           content: {
//             ...content,
//             imageUrl,
//           },
//         },
//       });
//       console.log(
//         'imageUrl backend service frm the ensureFilePosterImage:',
//         imageUrl,
//       );
//       if (questions) {
//         console.log("send data when there's no image:", questions);
//         return questions;
//       }
//     }
//     else{
//     console.log('question data when there is image:', question);
//     return questions;
//     }
//   }
//   console.log('another mode', questions);
//   return questions;
// }
export async function getQuestion(mode: GameMode, level: number) {
  const questions = await prisma.question.findMany({
    where: {
      mode,
      levelNumber: level,
    },
  });

  // If no questions found in DB, return empty array immediately
  if (!questions.length) return [];

  if (mode === GameMode.BLURRED_POSTER) {
    const question = questions[0];
    const content = question?.content as QuestionContent;
    const correctAnswer = content?.correctAnswer;
    const imageUrl = content?.imageUrl;

    console.log('imageUrl backend service:', imageUrl);
    console.log('question data:', question);

    // If poster image doesn't exist yet in DB, fetch and save it
    if (correctAnswer && !imageUrl) {
      const newImageUrl = await ensureFilePosterImage(
        correctAnswer,
        'file-poster',
      );

      if (newImageUrl && question) {
        // Update DB with the new imageUrl inside the JSON content object
        const updatedQuestion = await prisma.question.update({
          where: {
            id: question.id,
          },
          data: {
            content: {
              ...content,
              imageUrl: newImageUrl,
            },
          },
        });

        console.log('imageUrl fetched and saved successfully:', newImageUrl);

        // Always return an ARRAY so frontend API interface stays consistent
        return [updatedQuestion];
      }
    }

    // If imageUrl already existed, return the questions array
    console.log('question data with existing image:', question);
    return [question];
  }

  console.log('another mode:', questions);
  return questions;
}

export async function getQuestionsCount() {
  const questionsCount = await prisma.question.count();
  console.log('questionsCount:', questionsCount);
  return questionsCount;
}
