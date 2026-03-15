import { Router } from "express";
import container from "@/container";
import TemplateController from "@/controllers/template.controller";

const router = Router();
const templateController = container.resolve(TemplateController);

router.post("/template", templateController.createTemplate);
router.get("/templates", templateController.getTemplates);
router.get("/template/:id", templateController.getTemplateById);
router.get("/templates/channel/:channelId", templateController.getTemplatesByChannelId);
router.get("/templates/group/:groupId", templateController.getTemplatesByGroupId);
router.put("/template/:id", templateController.updateTemplate);
router.delete("/template/:id", templateController.deleteTemplate);

export default router;
