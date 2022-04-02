<template>
  <div class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Tạo mới dự án</h5>
          <button
            type="button"
            class="btn btn-danger"
            data-dismiss="modal"
            aria-label="Close"
            @click="closeModal"
          >
            x
          </button>
        </div>
        <div class="modal-body">
          <input
            type="text"
            placeholder="Tên dự án..."
            class="input-nameproject"
          />
          <div class="container-uploadimg">
            <label for="input-img" class="preview">
              <i class="gg-software-upload"></i>
              <span>Tải ảnh lên</span>
              <img
                :src="project.avtProject"
                alt="img-project"
                class="image-project"
                ref="imgproject"
              />
            </label>
            <input
              type="file"
              hidden
              id="input-img"
              @change="uploadimgproject"
            />
          </div>
        </div>
        <!--                       -->
        <div class="wrapper">
          <div class="title-member">
            <h5>Thành viên dự án</h5>
          </div>
          <div class="content-member">
            <ul class="list-member">
              <li
                v-for="member in project.members"
                :key="member"
                @click="removeMember(member)"
              >
                <span class="badge bg-primary">{{ member }} x</span>
              </li>
              <input
                type="text"
                spellcheck="false"
                placeholder="Nhập vào username"
              />
            </ul>
          </div>
        </div>
        <!-- ...................... -->
        <div class="form-floating">
          <textarea
            class="form-control"
            placeholder="Leave a comment here"
            id="floatingTextarea2"
            style="height: 100px"
          ></textarea>
          <label for="floatingTextarea2">Mô tả dự án</label>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-danger"
            data-dismiss="modal"
            @click="closeModal"
          >
            Đóng
          </button>
          <button type="button" class="btn btn-primary">Tạo dự án mới</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  dbstorage,
  refstorage,
  uploadBytes,
  getDownloadURL,
} from "../configs/firebase";
export default {
  data() {
    return {
      project: {
        titleProject: "",
        avtProject: "",
        description: "",
        creator: this.$store.state.user.id,
        members: ["0336277758", "admin"],
        date: "",
      },
    };
  },
  methods: {
    closeModal() {
      this.$emit("closemodal");
    },
    async uploadimgproject(e) {
      const file = e.target.files[0];
      const storageRef = refstorage(dbstorage, "avt/" + file.name);
      await uploadBytes(storageRef, file).then((snapshot) => {
        console.log("Uploaded a blob or file!" + snapshot);
      });
      await getDownloadURL(storageRef, file).then((url) => {
        this.project.avtProject = url;
        this.$refs.imgproject.style = "display : inline-block;";
      });
    },
    removeMember(member) {
      this.project.members = this.project.members.filter(
        (item) => item !== member
      );
    },
  },
};
</script>
<style scoped>
.modal {
  background-color: #504e4e65;
  display: block;
  backdrop-filter: blur(2px);
}
.modal-dialog {
  max-width: 800px;
}
.modal-body {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.input-nameproject {
  border: none;
  outline: none;
  font-size: 25px;
  width: 100%;
  padding: 20px;
}
.container-uploadimg {
  width: 600px;
  height: 200px;
}
.preview {
  border: 2px dashed rgb(45, 45, 45);
  width: 100%;
  height: 100%;
  font-size: 22px;
  position: relative;
  border-radius: 6px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
}
.form-floating {
  margin: 20px;
}
.wrapper {
  margin: 20px;
}
.list-member {
  width: calc(100%);
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  margin: 20px 0;
  border-radius: 5px;
  border: 1px solid #888;
}
.image-project {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  display: none;
}
.list-member li {
  cursor: pointer;
  margin: 3px;
}
.content-member ul input {
  flex: 1;
  padding: 5px;
  border: none;
  outline: none;
  font-size: 16px;
}
</style>
