"use strict";
// MatchScoreboard.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchScoreboard = void 0;
class MatchScoreboard {
    constructor() {
        this.matches = [];
    }
    // Start a new match and add it to the scoreboard
    startNewMatch(homeTeam, awayTeam) {
        const newMatch = {
            homeTeam,
            awayTeam,
            homeScore: 0,
            awayScore: 0,
            startTime: new Date(),
        };
        this.matches.push(newMatch);
    }
    // Get all matches on the scoreboard
    getAllMatches() {
        return this.matches;
    }
    // Update score of a match
    updateScore(homeScore, awayScore) {
        if (this.matches.length === 0) {
            throw new Error("No matches in progress.");
        }
        const currentMatch = this.matches[this.matches.length - 1];
        currentMatch.homeScore = homeScore;
        currentMatch.awayScore = awayScore;
    }
    // Finish match currently in progress
    finishMatch() {
        if (this.matches.length === 0) {
            throw new Error("No matches in progress.");
        }
        this.matches.pop();
    }
    // Get a summary of matches in progress ordered by total score and start time
    getMatchesInProgressSummary() {
        const sortedMatches = this.matches.slice().sort((a, b) => {
            const totalScoreDiff = b.homeScore + b.awayScore - a.homeScore - a.awayScore;
            if (totalScoreDiff !== 0) {
                return totalScoreDiff;
            }
            else {
                return b.startTime.getTime() - a.startTime.getTime();
            }
        });
        return sortedMatches;
    }
}
exports.MatchScoreboard = MatchScoreboard;
