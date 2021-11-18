// id = v4

interface Player {
  hp: number;
  user: User;
  words: Word[]; // back-end
}

interface Match {
  id: string;
  players: Player[];
}

interface Word {
  word: string;
  id: string;
  position: number // 0 - 100
}
interface AttackWord {
  word: string;
  id: string;
}

// Join / Create
// Join:
interface JoinLobbyRequest {
  code: string;
}
interface JoinLobbyResponse {
  match: Match;
}
// Create:
interface CreateLobbyRequest {
  id: string;
}
interface CreateLobbyResponse {
  lobby: Lobby;
}
// event
interface StartLobbyEvent {
  match: Match;
}


// Match
interface AuthRequest {
  nickname: string;
}

interface AuthResponse {
  user: User;
}

// Join / Create
// Join:
interface JoinLobbyRequest {
  code: string;
}
interface JoinLobbyResponse {
  match: Match;
}
// Create:
interface CreateLobbyRequest {
  id: string;
}
interface CreateLobbyResponse {
  lobby: Lobby;
}
// event
interface StartLobbyEvent {
  match: Match;
}
