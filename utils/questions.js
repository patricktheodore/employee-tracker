const mainMenu = [
    {
        type: "list",
        name: "startMenu",
        message: "What would you like to do?",
        choices: [
            "View All Departments",
            "View All Roles",
            "View All Employees",
            "Add a Department",
            "Add a Role",
            "Add an Employee",
            "Update an Employee Role",
            "Exit"
        ],
        default: "View All Departments",
        loop: false,
    },
]


module.exports = {
    mainMenu,

}