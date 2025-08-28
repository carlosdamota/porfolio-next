'use client'
import React from "react";
import { Button } from "./Button";
import { FiExternalLink, FiGithub } from "react-icons/fi";

interface Project {
  githubProjectLink?: string;
  liveLink?: string;
}
export const CardsButtons = ({ githubProjectLink, liveLink }: Project) => {
  const hasGithubProjectLink = githubProjectLink !== undefined;
  const hasLiveLink = liveLink !== undefined;
  return (
    <div className='flex  gap-4 '>
      {hasGithubProjectLink && (
        <Button
          href={`${githubProjectLink}`}
          target='_blank'
          style='secondary-card'
        >
          <FiGithub />
          Codigo
        </Button>
      )}
      {hasLiveLink &&
        <Button
          href={`${liveLink}`}
          target='_blank'
          style='primary-card'
        >
          <FiExternalLink />
          Demo
        </Button>
      }
    </div>
  );
};
