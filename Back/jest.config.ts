module.exports = {
	moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
	moduleNameMapper: {
		// Other mappers if needed
	},
	transform: {
		"^.+\\.(js|jsx|ts|tsx)$": "ts-jest",
	},
	testEnvironment: "node",
	// COVERAGE
	collectCoverage: true,
	coverageDirectory: "./coverage",
	coverageReporters: ["lcov", "text"],
	collectCoverageFrom: [
		"src/**/*.{ts,tsx}",
		"!src/**/*.d.ts",
		"!src/**/*.index.ts",
		"!src/tests/**",
	],
};
