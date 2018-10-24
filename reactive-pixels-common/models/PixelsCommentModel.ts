export interface IPixelsCommentModel {
  id: string;
  uid: string;
  timestamp: string; // confirm this type
  displayName: string;
  githubUserId: string;
  likes: string[];
  text: string;
}
