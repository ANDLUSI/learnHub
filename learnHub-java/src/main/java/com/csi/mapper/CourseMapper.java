package com.csi.mapper;

import com.csi.domain.Course;
import com.csi.domain.Order;
import com.csi.vo.EditCourse;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface CourseMapper {
    //查询老师教的课程
    List<Course> findCourseByTeaId(String teacherId);
    //查询课程信息
    Course findCourseById(Integer id);
    //根据类型id查询课程信息
    List<Course> courseList(Integer categoryId);

    EditCourse getCourseStr(Integer courseId);
    //<foreach> 标签用于遍历传入的集合（如 List、Set 或数组），并在 SQL 语句中生成相应的占位符或值。它的属性包括：
    //
    //collection：指定要遍历的集合名称。在本例中，collection='categoryIds' 表示我们遍历的是名为 categoryIds 的参数。
    //item：表示集合中的每个元素的别名。这里 item='id' 表示每次迭代时当前元素会被命名为 id。
    //open 和 close：分别指定集合开始和结束的符号。在这里，open='(' 和 close=')' 确保生成的 SQL 语句正确地包裹了集合元素。
    //separator：指定集合元素之间的分隔符。在这里，separator=',' 确保每个元素之间用逗号分隔。
    //根据用户选择的感兴趣标签选中多个分类名，根据多个分类id选中多个分类下的课程
    //根据传入的类别 ID 列表，从 course 表中查找对应的课程，并限制返回的课程数量。
//    @Select("select * from course where category_id IN" +"<foreach item='id' collection ='categoryId' open='(' separator=',' close=')'>"+
//    "#{id}"+"</foreach> "+"LIMIT #{limit}")
//    List<Course> findCourseByCategoryIds(@Param("categoryIds") List<Long> categoryIds,@Param("limit") Integer limit);
//    //根据传入的类别名称列表，从 category 表中查找对应的类别 ID
//    @Select("SELECT id FROM category WHERE categoryNames IN"+
//            "<foreach item='name' collection ='categoryNames' open='(' separator=',' close=')'>\"+\n" +
//            "    \"#{name}\"+\"</foreach> "
//    )
@Select("select c.* from \n" +
        "category ca\n" +
        "JOIN \n" +
        "course c\n" +
        "ON ca.id = c.category_id\n" +
        "where \n" +
        "category_name=#{categoryName}" +
        "LIMIT 3")
    List<Course> getCategoryIdsByName(@Param("categoryName") String categoryName);



    //查询所有课程
    List<Course> findCourseName(String courseName);
    //新增课程
    int add(Course course);

    //查询课程价格
    double   findCoursePrice(@Param("courseId") Integer courseId);
    int selectLiveStatus(@Param("courseId") Integer courseId) ;

    List<Course> selectRetiredCourse(@Param("studentId") Integer studentId);
}
