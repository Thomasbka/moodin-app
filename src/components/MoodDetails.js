import React from 'react';
import styled from 'styled-components';

const DetailsContainer = styled.div`
  text-align: center;
  margin: 20px;
`;

const MoodImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 10px;
  margin: 20px 0;
`;

const PlaylistLink = styled.a`
  display: block;
  color: #007bff;
  font-size: 1.2em;
  margin: 10px 0;
  &:hover {
    text-decoration: underline;
  }
`;

function MoodDetails({ mood }) {
  if (!mood) return null;

  return (
    <DetailsContainer>
      <h2>{mood.name}</h2>
      {mood.image && <MoodImage src={mood.image} alt={mood.name} />}
      {mood.playlist && (
        <PlaylistLink href={mood.playlist} target="_blank" rel="noopener noreferrer">
          Listen to the Playlist
        </PlaylistLink>
      )}
    </DetailsContainer>
  );
}

export default MoodDetails;
