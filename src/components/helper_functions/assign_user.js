import Axios from "axios";

const assign_user = async ({ userIds, plot, admin, sck }) => {
    try {

        // console.log(userIds, plot)
        // console.log("assign function", userIds, plot);
        const result = await Axios({
            method: "post",
            url: "http://localhost:8080/advmap/api/api_admin_action",
            headers: {
                sck: sck,//dynamic
                id: admin.id,//dynamic
                api_key: admin.api_key//dynamic
            },
            params: {
                action_type: "admin_plot_assign"
            },
            data: {
                "user_id": userIds.user_id,
                "user_key": userIds.user_key,
                "plot_id": plot.plot_id,
                "plot_key": plot.plot_key
            }
        })
        if (result.data) {
            console.log(result.data);
            if (result.data.status === "success") {
                return {
                    status: true,
                    data: result.data.data
                }
            } else {
                return {
                    status: false,
                    message: result.data.data.plot_inforamtion.message
                };
            }
        } else {
            return {
                status: false,
                message: "problem"
            };
        }
    } catch (error) {
        console.log(error);
        return {
            status: false,
            message: "problem"
        };
    }
}
export default assign_user;