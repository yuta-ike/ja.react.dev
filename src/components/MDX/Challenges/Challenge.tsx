/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

import {useState} from 'react';
import cn from 'classnames';
import {Button} from 'components/Button';
import {ChallengeContents} from './Challenges';
import {IconHint} from '../../Icon/IconHint';
import {IconSolution} from '../../Icon/IconSolution';
import {IconArrowSmall} from '../../Icon/IconArrowSmall';
import {H4} from '../Heading';

interface ChallengeProps {
  isRecipes?: boolean;
  totalChallenges: number;
  currentChallenge: ChallengeContents;
  hasNextChallenge: boolean;
  handleClickNextChallenge: () => void;
}

export function Challenge({
  isRecipes,
  totalChallenges,
  currentChallenge,
  hasNextChallenge,
  handleClickNextChallenge,
}: ChallengeProps) {
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  const toggleHint = () => {
    if (showSolution && !showHint) {
      setShowSolution(false);
    }
    setShowHint((hint) => !hint);
  };

  const toggleSolution = () => {
    if (showHint && !showSolution) {
      setShowHint(false);
    }
    setShowSolution((solution) => !solution);
  };

  return (
    <div className="p-5 sm:py-8 sm:px-8">
      <div>
        <H4
          className="text-xl text-primary dark:text-primary-dark mb-2 mt-0 font-medium"
          id={currentChallenge.id}>
          <div className="font-bold block md:inline">
            {isRecipes ? '例' : 'チャレンジ'} {currentChallenge.order}/
            {totalChallenges}
            <span className="text-primary dark:text-primary-dark">: </span>
          </div>
          {currentChallenge.name}
        </H4>
        {currentChallenge.content}
      </div>
      <div className="flex justify-between items-center mt-4">
        {currentChallenge.hint ? (
          <div>
            <Button className="mr-2" onClick={toggleHint} active={showHint}>
              <IconHint className="mr-1.5" />{' '}
              {showHint ? 'ヒントを隠す' : 'ヒントを見る'}
            </Button>
            <Button
              className="mr-2"
              onClick={toggleSolution}
              active={showSolution}>
              <IconSolution className="mr-1.5" />{' '}
              {showSolution ? '答えを隠す' : '答えを見る'}
            </Button>
          </div>
        ) : (
          !isRecipes && (
            <Button
              className="mr-2"
              onClick={toggleSolution}
              active={showSolution}>
              <IconSolution className="mr-1.5" />{' '}
              {showSolution ? '答えを隠す' : '答えを見る'}
            </Button>
          )
        )}

        {hasNextChallenge && (
          <Button
            className={cn(
              isRecipes
                ? 'bg-purple-50 border-purple-50 hover:bg-purple-50 focus:bg-purple-50 active:bg-purple-50'
                : 'bg-link dark:bg-link-dark'
            )}
            onClick={handleClickNextChallenge}
            active>
            次の{isRecipes ? '例' : 'チャレンジ'}
            <IconArrowSmall displayDirection="right" className="block ml-1.5" />
          </Button>
        )}
      </div>
      {showHint && currentChallenge.hint}

      {showSolution && (
        <div className="mt-6">
          <h3 className="text-2xl font-bold text-primary dark:text-primary-dark">
            答え
          </h3>
          {currentChallenge.solution}
          <div className="flex justify-between items-center mt-4">
            <Button onClick={() => setShowSolution(false)}>答えを閉じる</Button>
            {hasNextChallenge && (
              <Button
                className={cn(
                  isRecipes ? 'bg-purple-50' : 'bg-link dark:bg-link-dark'
                )}
                onClick={handleClickNextChallenge}
                active>
                次の問題
                <IconArrowSmall
                  displayDirection="right"
                  className="block ml-1.5"
                />
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
