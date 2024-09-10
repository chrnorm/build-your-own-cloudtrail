package policysort

import (
	"regexp"
	"strconv"
)

var policyIDRegex = regexp.MustCompile(`^.*\.policy(\d+)`)

// Sort Cedar policies by their ID.
// For example, provided a list of policies
//
//	["default.policy1", "default.policy10", "default.policy2"]
//
// This function can be used with slices.Sort() to output
//
//	["default.policy1", "default.policy2", "default.policy3"]
func Sort(a, b string) int {
	var aID, bID int
	aIDStr := policyIDRegex.FindStringSubmatch(a)
	if len(aIDStr) > 0 {
		aID, _ = strconv.Atoi(aIDStr[1])
	}

	bIDStr := policyIDRegex.FindStringSubmatch(b)
	if len(bIDStr) > 0 {
		bID, _ = strconv.Atoi(bIDStr[1])
	}

	if aID < bID {
		return -1
	}

	if aID > bID {
		return 1
	}

	return 0
}
