import { formatDate } from "../../helper/formatDate";
import { ToolTip } from "../common/Tooltip";

const PostDate = ({ createdAt }) => {
  return (
    <div className={"flex gap-1 py-4"}>
      <div className="group relative">
        <div
          className={
            "custom-underline peer whitespace-nowrap text-light-secondary dark:text-dark-secondary text-neutral-600 text-sm"
          }
        >
          {formatDate(createdAt, "full")}
        </div>
        <ToolTip
          className="translate-y-1 peer-focus:opacity-100 peer-focus-visible:visible peer-focus-visible:delay-200"
          tip={formatDate(createdAt, "full")}
        />
      </div>
    </div>
  );
};

export default PostDate;
