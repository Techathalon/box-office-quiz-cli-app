import prisma from '../config/prisma.js';
import { GameMode } from '../../generated/prisma/enums.js';
import { ensureFilePosterImage } from './image.service.js';
import { publicUrl } from '../utils/minio.util.js';

interface QuestionContent {
  options?: string[];
  imageUrl?: string;
  correctAnswer?: string;
}

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
      const fileName = await ensureFilePosterImage(
        correctAnswer,
        'file-poster',
      );

      if (fileName && question) {
        const newImageUrl = publicUrl('file-poster', fileName);
        // Update DB with the new imageUrl inside the JSON content object
        const updatedQuestion = await prisma.question.update({
          where: {
            id: question.id,
          },
          data: {
            content: {
              ...content,
              imageUrl: fileName,
            },
          },
        });

        console.log('imageUrl fetched and saved successfully:', newImageUrl);

        // Always return an ARRAY so frontend API interface stays consistent
        return [
          {
            ...updatedQuestion,
            content: {
              ...content,
              imageUrl: newImageUrl,
            },
          },
        ];
      }
    }

    // If imageUrl already existed, return the questions array
    console.log('question data with existing image:', question);
    return [
      {
        ...question,
        content: {
          ...content,
          imageUrl: publicUrl('file-poster', imageUrl as string),
        },
      },
    ];
  }

  console.log('another mode:', questions);
  return questions;
}

export async function getQuestionsCount() {
  const questionsCount = await prisma.question.count();
  console.log('questionsCount:', questionsCount);
  return questionsCount;
}
