// Grade point mapping
const gradePoints = {
    'A': 4.0,
    'A+': 4.0,
    'A-': 3.7,
    'B+': 3.3,
    'B': 3.0,
    'B-': 2.7,
    'C+': 2.3,
    'C': 2.0,
    'C-': 1.7,
    'D+': 1.3,
    'D': 1.0,
    'D-': 0.7,
    'F': 0.0
};

// Focus on first input box when page loads
window.addEventListener('DOMContentLoaded', function() {
    document.getElementById('credit1').focus();
});

// Function to get grade point value
function getGradePoint(grade) {
    if (!grade) return null;
    
    // Convert to uppercase and remove whitespace
    grade = grade.toUpperCase().trim();
    
    // Check if grade exists in mapping
    if (gradePoints.hasOwnProperty(grade)) {
        return gradePoints[grade];
    }
    
    return null;
}

// Function to calculate GPA
function calculateGPA() {
    let totalPoints = 0;
    let totalCredits = 0;
    let validEntries = 0;
    
    // Check all 5 courses
    for (let i = 1; i <= 5; i++) {
        const creditInput = document.getElementById('credit' + i);
        const gradeInput = document.getElementById('grade' + i);
        
        const credits = parseFloat(creditInput.value);
        const grade = gradeInput.value;
        
        // Check if both credit hours and grade are provided
        if (credits && credits > 0 && grade) {
            const gradePoint = getGradePoint(grade);
            
            if (gradePoint !== null) {
                totalPoints += gradePoint * credits;
                totalCredits += credits;
                validEntries++;
            } else {
                alert('Invalid grade entered for Course ' + i + '. Please enter a valid letter grade (A, B, C, D, F with optional + or -).');
                return;
            }
        } else if ((credits && credits > 0 && !grade) || (!credits && grade)) {
            // If one is filled but not the other
            alert('Please enter both credit hours and grade for Course ' + i + ', or leave both empty.');
            return;
        }
    }
    
    // Validate minimum entries (at least 2)
    if (validEntries < 2) {
        alert('Please enter at least 2 courses with both credit hours and grades.');
        return;
    }
    
    // Calculate average GPA
    if (totalCredits > 0) {
        const avgGPA = totalPoints / totalCredits;
        document.getElementById('avgGPA').value = avgGPA.toFixed(2);
    } else {
        document.getElementById('avgGPA').value = '';
    }
}

// Function to reset all input boxes
function resetGPA() {
    // Clear all credit hour inputs
    for (let i = 1; i <= 5; i++) {
        document.getElementById('credit' + i).value = '';
        document.getElementById('grade' + i).value = '';
    }
    
    // Clear GPA result
    document.getElementById('avgGPA').value = '';
    
    // Focus on first input
    document.getElementById('credit1').focus();
}

