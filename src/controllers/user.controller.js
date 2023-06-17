export const getUsers = async (req, res) => {
    return res.status(200).json({
        type: 'Success',
        message: 'successfulUsersFound',
        data: {name: "Hieu"}
    })
}