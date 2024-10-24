import { Request, Response } from 'express';
import Campaign from '../models/Campaign';
import Candidate from '../models/Candidate';

export const createCampaign = async (req: Request, res: Response) => {
  const { title, description } = req.body;

  try {
    const newCampaign = new Campaign({ title, description });
    await newCampaign.save();
    res.status(201).json({ message: 'Campaña creada exitosamente.', campaign: newCampaign });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la campaña.' });
  }
};

export const getCampaigns = async (req: Request, res: Response) => {
  try {
    const campaigns = await Campaign.find().populate('candidates');
    res.status(200).json(campaigns);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las campañas.' });
  }
};

export const toggleCampaignStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  
  try {
    const campaign = await Campaign.findById(id);
    if (!campaign) return res.status(404).json({ message: 'Campaña no encontrada.' });

    campaign.isActive = !campaign.isActive;
    await campaign.save();

    res.status(200).json({ message: 'Estado de campaña actualizado.', campaign });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el estado de la campaña.' });
  }
};
