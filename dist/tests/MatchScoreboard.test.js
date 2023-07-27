"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MatchScoreboard_1 = require("../src/MatchScoreboard");
describe("MatchScoreboard", () => {
    let scoreboard;
    beforeEach(() => {
        scoreboard = new MatchScoreboard_1.MatchScoreboard();
    });
    test("should add a new match correctly", () => {
        scoreboard.startNewMatch("Team A", "Team B");
        scoreboard.startNewMatch("Team C", "Team D");
        const allMatches = scoreboard.getAllMatches();
        expect(allMatches).toHaveLength(2);
        // Verify the details of the first match
        expect(allMatches[0].homeTeam).toBe("Team A");
        expect(allMatches[0].awayTeam).toBe("Team B");
        expect(allMatches[0].homeScore).toBe(0);
        expect(allMatches[0].awayScore).toBe(0);
        // Verify the details of the second match
        expect(allMatches[1].homeTeam).toBe("Team C");
        expect(allMatches[1].awayTeam).toBe("Team D");
        expect(allMatches[1].homeScore).toBe(0);
        expect(allMatches[1].awayScore).toBe(0);
    });
    test("should update score correctly", () => {
        scoreboard.startNewMatch("Team X", "Team Y");
        scoreboard.updateScore(2, 1);
        const ongoingMatches = scoreboard.getAllMatches();
        expect(ongoingMatches).toHaveLength(1);
        // Verify the details of the ongoing match
        expect(ongoingMatches[0].homeTeam).toBe("Team X");
        expect(ongoingMatches[0].awayTeam).toBe("Team Y");
        expect(ongoingMatches[0].homeScore).toBe(2);
        expect(ongoingMatches[0].awayScore).toBe(1);
    });
    test("should finish a match in progress", () => {
        scoreboard.startNewMatch("Team E", "Team F");
        scoreboard.startNewMatch("Team G", "Team H");
        const initialMatches = scoreboard.getAllMatches();
        expect(initialMatches).toHaveLength(2);
        // Finish the match in progress (the last match added)
        scoreboard.finishMatch();
        const remainingMatches = scoreboard.getAllMatches();
        expect(remainingMatches).toHaveLength(1);
        // Verify the details of the remaining match (the first match in the array)
        expect(remainingMatches[0].homeTeam).toBe("Team E");
        expect(remainingMatches[0].awayTeam).toBe("Team F");
        expect(remainingMatches[0].homeScore).toBe(0);
        expect(remainingMatches[0].awayScore).toBe(0);
    });
    test("should throw error when finishing match with no matches in progress", () => {
        expect(() => {
            scoreboard.finishMatch();
        }).toThrow("No matches in progress.");
    });
    test("should get matches in progress summary ordered by total score and start time", () => {
        // Add matches with different scores
        scoreboard.startNewMatch("Team A", "Team B");
        scoreboard.updateScore(3, 1); // Total score = 4
        scoreboard.startNewMatch("Team C", "Team D");
        scoreboard.updateScore(2, 2); // Total score = 4
        scoreboard.startNewMatch("Team X", "Team Y");
        scoreboard.updateScore(0, 1); // Total score = 1
        // Get the matches in progress summary
        const summaryMatches = scoreboard.getMatchesInProgressSummary();
        // Verify the length of the summary
        expect(summaryMatches).toHaveLength(3);
        // Verify the order of matches based on total score and start time
        expect(summaryMatches[0].homeTeam).toBe("Team A");
        expect(summaryMatches[0].awayTeam).toBe("Team B");
        expect(summaryMatches[0].homeScore).toBe(3);
        expect(summaryMatches[0].awayScore).toBe(1);
        expect(summaryMatches[1].homeTeam).toBe("Team C");
        expect(summaryMatches[1].awayTeam).toBe("Team D");
        expect(summaryMatches[1].homeScore).toBe(2);
        expect(summaryMatches[1].awayScore).toBe(2);
        expect(summaryMatches[2].homeTeam).toBe("Team X");
        expect(summaryMatches[2].awayTeam).toBe("Team Y");
        expect(summaryMatches[2].homeScore).toBe(0);
        expect(summaryMatches[2].awayScore).toBe(1);
    });
    test("should handle matches with the same total score ordered by start time", () => {
        scoreboard.startNewMatch("Team S", "Team T");
        scoreboard.updateScore(3, 0); // Total score = 3
        scoreboard.startNewMatch("Team U", "Team V");
        scoreboard.updateScore(1, 2); // Total score = 3
        scoreboard.startNewMatch("Team W", "Team X");
        scoreboard.updateScore(2, 1); // Total score = 3
        const summaryMatches = scoreboard.getMatchesInProgressSummary();
        // Verify the length of the summary
        expect(summaryMatches).toHaveLength(3);
        // Verify the order of matches based on start time (most recent first)
        expect(summaryMatches[0].homeTeam).toBe("Team S");
        expect(summaryMatches[0].awayTeam).toBe("Team T");
        expect(summaryMatches[0].homeScore).toBe(3);
        expect(summaryMatches[0].awayScore).toBe(0);
        expect(summaryMatches[1].homeTeam).toBe("Team U");
        expect(summaryMatches[1].awayTeam).toBe("Team V");
        expect(summaryMatches[1].homeScore).toBe(1);
        expect(summaryMatches[1].awayScore).toBe(2);
        expect(summaryMatches[2].homeTeam).toBe("Team W");
        expect(summaryMatches[2].awayTeam).toBe("Team X");
        expect(summaryMatches[2].homeScore).toBe(2);
        expect(summaryMatches[2].awayScore).toBe(1);
    });
    test("should return an empty array when there are no matches in progress", () => {
        const summaryMatches = scoreboard.getMatchesInProgressSummary();
        expect(summaryMatches).toEqual([]);
    });
    test("should handle matches with the same total score ordered by start time from the requiremnts", () => {
        //a. Mexico 0 - Canada 5
        //b. Spain 10 - Brazil 2
        //c. Germany 2 - France 2
        //d. Uruguay 6 - Italy 6
        //e. Argentina 3 - Australia 1
        scoreboard.startNewMatch("Mexico", "Canada");
        scoreboard.updateScore(0, 5);
        scoreboard.startNewMatch("Spain", "Brazil");
        scoreboard.updateScore(10, 2);
        scoreboard.startNewMatch("Germany", "France");
        scoreboard.updateScore(2, 2);
        scoreboard.startNewMatch("Uruguay", "Italy");
        scoreboard.updateScore(6, 6);
        scoreboard.startNewMatch("Argentina", "Australia");
        scoreboard.updateScore(3, 1);
        const summaryMatches = scoreboard.getMatchesInProgressSummary();
        // Verify the length of the summary
        expect(summaryMatches).toHaveLength(5);
        // Verify the order of matches based on start time (most recent first)
        expect(summaryMatches[0].homeTeam).toBe("Uruguay");
        expect(summaryMatches[0].awayTeam).toBe("Italy");
        expect(summaryMatches[0].homeScore).toBe(6);
        expect(summaryMatches[0].awayScore).toBe(6);
    });
});
