package com.csi.controller;

import com.csi.domain.CollectionMy;
import com.csi.domain.CollectionDTO;
import com.csi.domain.Result;
import com.csi.service.CollectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/collection")
public class CollectionController {
    @Autowired
    private CollectionService collectionService;

    /**
     * 新增收藏
     * @param collectionDTO
     * @return
     */
    @RequestMapping("/add")
    public Object add(@RequestBody CollectionDTO collectionDTO){
        System.out.println("收藏新增"+collectionDTO.getCourseId()+"..."+collectionDTO.getStudentId());
        int ret = collectionService.add(collectionDTO);
        if (ret!=0){
            Result result = new Result<>("操作成功",2001);
            return  result;
        }
        Result result = new Result<>("操作失败",4001);
        return result;
    }

    /**
     * 取消收藏
     * @param id
     * @return
     */
    @RequestMapping("/del")
    public Object del(@RequestParam("id") Integer id){
        int ret = collectionService.del(id);
        if (ret!=0){
            Result result = new Result<>("操作成功",2001);
            return  result;
        }
        Result result = new Result<>("操作失败",4001);
        return result;
    }

    /**
     * 查看学生底下的收藏
     * @param studentId
     * @return
     */
    @RequestMapping("/find")
    public Object find(@RequestParam("studentId") Integer studentId){
        List<CollectionMy> list = collectionService.findListBySId(studentId);
        if (!list.isEmpty()){
            Result result = new Result<>("操作成功",2001);
            result.setData(list);
            return  result;
        }
        Result result = new Result<>("操作失败",4001);
        return result;
    }

    /**
     * 查询当前这门课是否被收藏
     * @param collectionDTO
     * @return
     */
    @RequestMapping("/findCollection")
    public Object findCollection(@RequestBody CollectionDTO collectionDTO){

        System.out.println("收藏查询"+collectionDTO.getCourseId()+"..."+collectionDTO.getStudentId());

        CollectionDTO collectionDTO1  = collectionService.findCollection(collectionDTO);

        Result result = null;
        if (collectionDTO1!=null){
            result = new Result<>("操作成功",2001);
            result.setData(collectionDTO1);
        }else {
            result = new Result<>("操作失败",4001);
        }
        return result;

    }

}
